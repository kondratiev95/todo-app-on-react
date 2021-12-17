import React from "react";


export class Footer extends React.Component {

    counter = () => {
        if(this.props.updateCounter() === 1) {
           return `${this.props.updateCounter()} item left`
        } else {
           return `${this.props.updateCounter()} items left`
        }
    }

    
    render() {
        return (
            <div className='todo-footer'>
                <div className="counter">{this.counter()}</div>
                <div className="filter-btns">
                    <button onClick={this.props.filterAll}>all</button>
                    <button onClick={this.props.filterActive}>active</button>
                    <button onClick={this.props.filterCompleted}>completed</button>
                </div>
                {
                    this.props.todos.find(todo => todo.completed)
                    ?   <button 
                            onClick={this.props.deleteCompletedTodo} 
                            className='clear-completed'>
                            clear completed
                        </button>
                    : null
                }
            </div>
        )
    }
}