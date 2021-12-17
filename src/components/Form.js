import React from "react";

export class Form extends React.Component {
    

    render() {
        return (
            <div className="todo-form">
                    { 
                        this.props.todosLength 
                        ? <i 
                            className={this.props.isAllTodosCompleted ? 'fas fa-angle-down dark-opacity' : 'fas fa-angle-down'} 
                            onClick={this.props.handleAllCompleted}></i> 
                        : null
                    }
                    <input 
                        type="text" 
                        placeholder="What needs to be done?"
                        value={this.props.newItemValue}
                        onChange={e => this.props.updateItemValue(e.target.value)}
                        onKeyPress = {e => this.props.addItem(e)}
                    />
            </div>
        )
    }
}