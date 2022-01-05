import React from "react";
import { Item } from "./Item";
import { TodoContext } from "../context";

export class ListItem extends React.Component {
  render() {
    const { filteredTodos } = this.context;
    return (
      <ul className="todo-list">
        {filteredTodos.map((task) => (
          <Item task={task} key={task._id} />
        ))}
      </ul>
    );
  }
}
ListItem.contextType = TodoContext;
