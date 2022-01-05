import React from "react";
import { Form } from "./Form";
import { ListItem } from "./ListItem";
import { Footer } from "./Footer";
import { EventEmitter } from "../EventEmmiter";
import { 
  getData, 
  addData, 
  deleteItem, 
  toggleItem, 
  deleteCompleted, 
  changeTodo,
  toggleAll
} from "../todoAPI";
import { TodoProvider } from "../context";

export class Root extends React.Component {

  constructor(props) {
    super(props);
    this.eventEmitter = EventEmitter.getInstance();
    this.eventEmitter.on('updateValue', e => this.updateItemValue(e));
    this.eventEmitter.on('addTodo', e => this.addItem(e));
    this.eventEmitter.on('removeItem', id => this.removeItem(id));
    this.eventEmitter.on('checkboxHandler', id => this.checkboxHandler(id));
    this.eventEmitter.on('editTodo', (id, value) => this.editTodo(id, value));
    this.eventEmitter.on('filterTodosType', e => this.filterTodosType(e));
    this.eventEmitter.on('deleteCompletedTodo', () => this.deleteCompletedTodo());
    this.eventEmitter.on('handleAllCompleted', () => this.handleAllCompleted());

    this.state = {
      newItemValue: '',
      todos: [],
      counter: 0,
      type: 'all',
      isAllTodosCompleted: false,
      filterArray: []
    }
  }
   
  componentDidMount() {
    getData().then(data => {
      const newState = { todos: data, newItemValue: '' };
      this.updateState(newState);
    });
  }
 

  updateItemValue = (e) => {
    this.setState({ newItemValue: e.target.value });
  }
  
  addItem = (e) => {
    if(e.key === 'Enter' && this.state.newItemValue.trim().length !== 0) {
      addData(this.state.newItemValue).then(data => {
        const newState = { todos: data, newItemValue: '' };
        this.updateState(newState);
      });
    }
  }

  removeItem = (id) => {
    deleteItem(id).then(data => {
      const newState = { todos: data};
      this.updateState(newState);
    })
  }

  checkboxHandler = (id) => {
    toggleItem(id).then(data => {
      data.map(item => item.id === id ? {...item, completed: !item.completed} : item);
      const newState = {
        todos: data, 
        isAllTodosCompleted: data.every(todoItem => todoItem.completed),
      }
      this.updateState(newState);
    })
  } 

  updateState = (newState) => {
    const updatedCounter = newState.todos.filter(item => item.completed === false).length
    this.setState({
      ...newState,
      counter: updatedCounter,
    })
  }

  handleAllCompleted = () => {
    this.setState({ isAllTodosCompleted: !this.state.isAllTodosCompleted});
    toggleAll(this.state.isAllTodosCompleted).then(data => {
      const newState = { todos: data };
      this.updateState(newState);
    })
  }

  editTodo = (id, value) => {
    changeTodo({id, value}).then(data => {
      this.setState({ todos: data});
    });
  }

  filterTodosType = e => {
    this.setState({ type: e.target.getAttribute('data-type')});
  }

  deleteCompletedTodo = () => {
    deleteCompleted().then(data => {
      this.setState({ todos: data , isAllTodosCompleted: false});
    })
  }

  filterTodos = () => {
    if(this.state.type === 'completed') {
        // this.setState({filterArray: [...this.state.todos.filter(todo => todo.completed)]});
        return this.state.todos.filter(todo => todo.completed)
    } else if(this.state.type === 'active') {
        // this.setState({filterArray: [...this.state.todos.filter(todo => todo.completed === false)]});
        return this.state.todos.filter(todo => todo.completed === false)
    } else {
        // this.setState({filterArray: [...this.state.todos]});
        return this.state.todos
    }
  }

  render() {
    const store = this.state;
    const filteredTodos = this.filterTodos();
    return (
      <div className="todo-container">
        <TodoProvider value={{store, filteredTodos}}>
          <Form/>
          <ListItem/>
          { this.state.todos.length ? <Footer/> : null }
        </TodoProvider>
      </div>
    );  
  }
}