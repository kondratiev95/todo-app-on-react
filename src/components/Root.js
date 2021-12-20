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

      updateItemValue = newValue => {
        this.setState({ newItemValue: newValue })
      }
       
      addItem = (e) => {
        if(e.key === 'Enter' && this.state.newItemValue.trim().length !== 0) {
          const newItem = {
            id: new Date().toISOString(),
            value: this.state.newItemValue,
            completed: false,
          }
          const todos = [...this.state.todos];
          todos.push(newItem);
          this.setState({ todos, newItemValue: ''});
          
          console.log(this.state.isAllTodosCompleted)
        }
      }
    
      removeItem = (idx) => {
        console.log(idx)
        const newTodos = [...this.state.todos];
        newTodos.splice(idx, 1);
        this.setState({ todos: newTodos});
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
        console.log('newArr', newTodos)
        this.setState({ todos: newTodos });
        this.setState({ isAllTodosCompleted: newTodos.every(todoItem => todoItem.completed)})
        console.log('++++++', this.state.todos)
      }

      updateCounter = () => {
         let activeTodos = this.state.todos.filter(item => item.completed === false)
         return activeTodos.length;
      }

      handleAllCompleted = () => {
        this.setState({ isAllTodosCompleted: !this.state.isAllTodosCompleted})
        if(this.state.isAllTodosCompleted) {
            this.setState({ todos: this.state.todos.map(item => {
                return { ...item, completed: false}
            })})
        } else {
            this.setState({ todos: this.state.todos.map(item => {
                return { ...item, completed: true}
            })})
        }     
      }

      filterCompleted = () => {
        this.setState({ type: 'completed' })
      }

      filterAll = () => {
        this.setState({ type: 'all' })
      }

      filterActive = () => {
        this.setState({ type: 'active' })
      }

      deleteCompletedTodo = () => {
          let removeCompleted = this.state.todos.filter(todo => todo.completed === false);
          this.setState({ todos: removeCompleted });
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
                />
               {
                this.state.todos.length ? 
                    <Footer 
                        updateCounter={this.updateCounter}
                        filterCompleted={this.filterCompleted}
                        filterAll={this.filterAll}
                        deleteCompletedTodo={this.deleteCompletedTodo}
                        filterActive={this.filterActive}
                        todos={this.state.todos}
                    /> : null
                }
          </div>
        );  
      }
}