import React from 'react'

export class TodoItem extends React.Component {

    onCheckboxChange = () => {
        this.props.checkboxHandler(this.props.task.id)
    } 
    

    render() {
        return (
            <li className='todo-item'>

                <input 
                    id='item-checkbox'
                    className='input-checkbox'
                    type="checkbox" 
                    onChange={() => this.props.checkboxHandler(this.props.task.id)} 
                    checked={this.props.task.completed}
                />

                <label htmlFor={this.props.task.id} onClick={() => this.props.checkboxHandler(this.props.task.id)}></label>

                <p className={this.props.task.completed ? 'todo-content toggle-checkbox' : 'todo-content'}>{this.props.task.value}</p>

                <button onClick={() => this.props.removeItem(this.props.idx)} className='delete'></button>

            </li>
        )
    }
}