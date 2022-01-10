import React from "react";
import { EventEmitter } from "../EventEmmiter";
import { TodoContext } from "../context";

export class Footer extends React.Component {
    constructor() {
        super();
        this.eventEmitter = EventEmitter.getInstance();

        this.state = {
            isTodoCompleted: false,
        }
    }

    componentDidMount() {
        const todos = this.context.todos;
        const isCompletedItem = todos.some(todo => todo.completed);
        if(isCompletedItem) {
            this.setState({ isCompletedItem: true })
        }
    }
     
    componentDidUpdate() {
        const todos = this.context.todos;
        const isCompletedItem = todos.some(todo => todo.completed);
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
        let { counter, type } = this.context;
        return (
            <div className='todo-footer'>
                <div className="counter">{`${counter} ${counter === 1 ? 'item' : 'items'} left`}</div>
                <div className="filter-btns">
                    <button 
                        data-type='all' 
                        onClick={this.filterType} 
                        className={type === 'all' ? 'focus-btn' : null}
                    >
                        all
                    </button>
                    <button 
                        data-type='active' 
                        onClick={this.filterType} 
                        className={type === 'active' ? 'focus-btn' : null}
                    >
                        active
                    </button>
                    <button 
                        data-type='completed' 
                        onClick={this.filterType} 
                        className={type === 'completed' ? 'focus-btn' : null}
                    >
                        completed
                    </button>
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
Footer.contextType = TodoContext;