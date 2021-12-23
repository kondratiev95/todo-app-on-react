import React from "react";
import { Item } from "./Item";

export class ListItem extends React.Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map((task) => (
          <Item task={task} key={task.id} />
        ))}
      </ul>
    );
  }
}
