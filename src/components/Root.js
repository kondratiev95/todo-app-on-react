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
          this.setState({ todos: [...this.state.todos, newItem], newItemValue: ''});
        }
      }
    
      removeItem = (id) => {
        this.setState({ todos: this.state.todos.filter(todo => todo.id !== id)});
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
        this.setState({ 
          todos: newTodos, 
          isAllTodosCompleted: newTodos.every(todoItem => todoItem.completed) 
        });
      }

      updateCounter = () => {
         return this.state.todos.filter(item => item.completed === false).length;
      }

      handleAllCompleted = () => {
        this.setState({ isAllTodosCompleted: !this.state.isAllTodosCompleted})
        if (this.state.isAllTodosCompleted) {
          const updatedTodos = this.state.todos.map(item => ({ ...item, completed: false }))
          this.setState({
            todos: updatedTodos,
          })
        } else {
          const updatedTodos = this.state.todos.map(item => ({ ...item, completed: true }))
          this.setState({
            todos: updatedTodos,
          })
        }
      }

      editTodo = (id, value) => {
        this.setState({ todos: this.state.todos.map(todo => (todo.id === id ? { ...todo, value } : todo))})
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