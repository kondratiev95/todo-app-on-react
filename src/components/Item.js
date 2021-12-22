import React from 'react'

export class Item extends React.Component {

    state = {
        editing: false,
        newValue: this.props.task.value,
    }

    onDoubleClick = () => {
        this.setState({ editing: true });
    }

    onInput = e => {
        this.setState({ newValue: e.target.value });
    }

    onInputKeyPress = e => {
        if(e.key === 'Enter') {
            this.onBlur(e);
        }
    }

    onBlur = () => {
        this.props.editTodo(this.props.task.id, this.state.newValue);
        this.setState({ editing: false });
    }

    onCheckboxChange = () => {
        this.props.checkboxHandler(this.props.task.id);
    } 

    deleteItem = id => {
        this.props.removeItem(id)
    }
    
    render() {
        return (
            this.state.editing 
            ? (
                <li className="edit-item">
                    <input 
                        type="text" 
                        className="input-edit"
                        autoFocus={true}
                        value={this.state.newValue}
                        placeholder={this.props.task.value}
                        onChange={this.onInput}
                        onKeyDown={this.onInputKeyPress}
                        onBlur={this.onBlur}
                    />
                </li>
            ) : (
                <li className='todo-item'>

                    <input 
                        id='item-checkbox'
                        className='input-checkbox'
                        type="checkbox" 
                        onChange={this.onCheckboxChange} 
                        checked={this.props.task.completed}
                    />

                    <label htmlFor={this.props.task.id} onClick={this.onCheckboxChange}></label>

                    <p 
                        className={this.props.task.completed ? 'todo-content toggle-checkbox' : 'todo-content'}
                        onDoubleClick={this.onDoubleClick}
                    >
                        {this.props.task.value}
                    </p>

                    <button onClick={() => this.deleteItem(this.props.task.id)} className='delete'></button>
                    
                </li> 
            )
        )
    }
}