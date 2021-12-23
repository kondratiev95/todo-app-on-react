import React from "react";
import { EventEmitter } from "../EventEmmiter";

export class Footer extends React.Component {
    constructor() {
        super();
        this.eventEmitter = EventEmitter.getInstance();

        this.state = {
            isTodoCompleted: false,
        }
    }
     
    componentDidUpdate() {
        const isCompletedItem = this.props.todos.some(todo => todo.completed)
        if (this.state.isTodoCompleted !== isCompletedItem) {
            this.setState({
                isTodoCompleted: isCompletedItem,
            })
        }
    }

    filterType = e => {
        this.eventEmitter.emit('filterTodosType', e)
    }

    deleteCompletedTodo = () => {
        this.eventEmitter.emit('deleteCompletedTodo')
    }

    render() {
        let { counter } = this.props;
        return (
            <div className='todo-footer'>
                <div className="counter">{`${counter} ${counter === 1 ? 'item' : 'items'} left`}</div>
                <div className="filter-btns">
                    <button data-type='all' onClick={this.filterType}>all</button>
                    <button data-type='active' onClick={this.filterType}>active</button>
                    <button data-type='completed' onClick={this.filterType}>completed</button>
                </div>
                {
                    this.state.isTodoCompleted
                    ?   <button 
                            onClick={this.deleteCompletedTodo} 
                            className='clear-completed'>
                            clear completed
                        </button>
                    : null
                }
            </div>
        )
    }
}