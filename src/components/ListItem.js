import React from "react";
import { TodoItem } from './TodoItem';


export class ListItem extends React.Component {
    render() {
        return(
            <ul className="todo-list">
                {this.props.todos.map((task, idx) => (
                <TodoItem 
                  task={task} 
                  key={task.id} 
                  idx={idx} 
                  removeItem={this.props.removeItem}
                  checkboxHandler={this.props.checkboxHandler}
                />
              ))}
            </ul>
        )
    }
}