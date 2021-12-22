import React from "react";

export class Footer extends React.Component {
    state = {
        isTodoCompleted: false,
    }

    componentDidUpdate() {
        const isCompletedItem = this.props.todos.some(todo => todo.completed)
        if (this.state.isTodoCompleted !== isCompletedItem) {
            this.setState({
                isTodoCompleted: isCompletedItem,
            })
        }
    }

    render() {
        let { counter } = this.props;
        return (
            <div className='todo-footer'>
                <div className="counter">{`${counter} ${counter === 1 ? 'item' : 'items'} left`}</div>
                <div className="filter-btns">
                    <button data-type='all' onClick={this.props.filterTodosType}>all</button>
                    <button data-type='active' onClick={this.props.filterTodosType}>active</button>
                    <button data-type='completed' onClick={this.props.filterTodosType}>completed</button>
                </div>
                {
                    this.state.isTodoCompleted
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