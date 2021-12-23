import React from "react";
import { EventEmitter } from "../EventEmmiter";

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.eventEmitter = EventEmitter.getInstance();
    }

    addTodo = (e) => {
        this.eventEmitter.emit('addTodo', e);
    }   

    updateItemValue = (e) => {
        this.eventEmitter.emit('updateValue', e);
    }

    handleAllCompleted = () => {
        this.eventEmitter.emit('handleAllCompleted');
    }
    
    render() {
        return (
            <div className="todo-form">
                { 
                    this.props.todosLength 
                    ?   <i 
                            className={this.props.isAllTodosCompleted ? 'fas fa-angle-down dark-opacity' : 'fas fa-angle-down'} 
                            onClick={this.handleAllCompleted}>
                        </i> 
                    : null
                }
                <input 
                    type="text" 
                    placeholder="What needs to be done?"
                    value={this.props.newItemValue}
                    onChange={this.updateItemValue}
                    onKeyPress={this.addTodo}
                />
            </div>
        )
    }
}