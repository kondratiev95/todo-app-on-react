import React from "react";
import { Form } from "./Form";
import { ListItem } from "./ListItem";
import { Footer } from "./Footer";
 
export class Root extends React.Component {
    
      state = {
        newItemValue: '',
        todos: [],
        counter: 0,
        type: 'all',
        isAllTodosCompleted: false
      }

      updateItemValue = e => {
        this.setState({ newItemValue: e.target.value })
      }
       
      addItem = (e) => {
        if(e.key === 'Enter' && this.state.newItemValue.trim().length !== 0) {
          const newItem = {
            id: new Date().toISOString(),
            value: this.state.newItemValue,
            completed: false,
          }
          const newState = { todos: [...this.state.todos, newItem], newItemValue: '' };
          this.updateState(newState);
        }
      }
    
      removeItem = (id) => {
        const newState = { todos: this.state.todos.filter(todo => todo.id !== id)};
        this.updateState(newState);
      }
    
      checkboxHandler = (id) => {
        const newTodos = this.state.todos.map(item => {
          if(item.id === id) {
            return {
              ...item,
              completed: !item.completed
            }
          } 
          else return item;
        })
        const newState = {
          todos: newTodos, 
          isAllTodosCompleted: newTodos.every(todoItem => todoItem.completed),
        }
        this.updateState(newState);
      } 

      updateState = (newState) => {
        const updatedCounter = newState.todos.filter(item => item.completed === false).length
        this.setState({
          ...newState,
          counter: updatedCounter,
        })
      }

      handleAllCompleted = () => {
        this.setState({ isAllTodosCompleted: !this.state.isAllTodosCompleted})
        if (this.state.isAllTodosCompleted) {
          const updatedTodos = this.state.todos.map(item => ({ ...item, completed: false }))
          const newState = { todos: updatedTodos };
          this.updateState(newState);
        } else {
          const updatedTodos = this.state.todos.map(item => ({ ...item, completed: true }))
          const newState = { todos: updatedTodos }
          this.updateState(newState);
        }
      }

      editTodo = (id, value) => {
        this.setState({ todos: this.state.todos.map(todo => (todo.id === id ? { ...todo, value } : todo))})
      }
 
      filterTodosType = e => {
        this.setState({ type: e.target.getAttribute('data-type')})
      }

      deleteCompletedTodo = () => {
          this.setState({ todos: this.state.todos.filter(todo => todo.completed === false)});
      }

      filterTodos = () => {
        if(this.state.type === 'completed') {
            return this.state.todos.filter(todo => todo.completed)
        } else if(this.state.type === 'active') {
            return this.state.todos.filter(todo => todo.completed === false)
        } else {
            return this.state.todos
        }
      }

      render() {
        return (
          <div className="todo-container">
               <Form 
                    updateItemValue={this.updateItemValue} 
                    addItem={this.addItem} 
                    newItemValue={this.state.newItemValue}
                    handleAllCompleted={this.handleAllCompleted}
                    todosLength={this.state.todos.length}
                    isAllTodosCompleted={this.state.isAllTodosCompleted}
                />
               <ListItem 
                    todos={this.filterTodos()} 
                    checkboxHandler={this.checkboxHandler} 
                    removeItem={this.removeItem}
                    editTodo={this.editTodo}
                />
               {
                this.state.todos.length ? 
                    <Footer 
                        counter={this.state.counter}
                        filterTodosType={this.filterTodosType}
                        deleteCompletedTodo={this.deleteCompletedTodo}
                        todos={this.state.todos}
                    /> : null
                }
          </div>
        );  
      }
}