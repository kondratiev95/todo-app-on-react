import React from 'react'
import { EventEmitter } from '../EventEmmiter';
import EditInput from './EditInput';

export class Item extends React.Component {

    constructor(props) {
        super(props);
        this.eventEmitter = EventEmitter.getInstance();

        this.state = {
            editing: false,
            newValue: this.props.task.value,
        }
    }

    onDoubleClick = () => {
         
        this.setState({ editing: true });
    }


 
    onInput = e => {
        this.setState({ newValue: e.target.value });
    }

    onInputKeyPress = e => {
        if(e.key === 'Enter') {
            this.onBlur();
        }
    }

    onBlur = () => {
        if(this.state.newValue.trim() !== 0) {
            this.eventEmitter.emit('editTodo', this.props.task._id, this.state.newValue);
            this.setState({ editing: false });
        } else {
            this.eventEmitter.emit('removeItem', this.props.task._id)
        }
    }

    onCheckboxChange = () => {
        this.eventEmitter.emit('checkboxHandler', this.props.task._id);
    } 

    deleteItem = () => {
        this.eventEmitter.emit('removeItem', this.props.task._id);
    }
    
    render() {
        return (
            this.state.editing 
            ? (
                <EditInput 
                    newValue={this.state.newValue} 
                    value={this.props.task.value} 
                    onInput={this.onInput}
                    onBlur={this.onBlur}
                    onInputKeyPress={this.onInputKeyPress}
                />
            ) : (
                <li className='todo-item'>

                    <input 
                        id='item-checkbox'
                        className='input-checkbox'
                        type="checkbox" 
                        onChange={this.onCheckboxChange} 
                        checked={this.props.task.completed}
                    />

                    <label htmlFor={this.props.task._id} onClick={this.onCheckboxChange}></label>

                    <p 
                        className={this.props.task.completed ? 'todo-content toggle-checkbox' : 'todo-content'}
                        onDoubleClick={this.onDoubleClick}
                    >
                        {this.props.task.value}
                    </p>

                    <button onClick={this.deleteItem} className='delete'></button>
                    
                </li> 
            )
        )
    }
}