import React from "react";
import { Item } from "./Item";
import { TodoContext } from "../context";

export class ListItem extends React.Component {
  render() {
    const  store  = this.context;
    console.log(store);
    const filteredTodos = store.todos.filter(item => {
      if(store.type === 'active') {
        return !item.completed;
      } else if(store.type === 'completed') {
        return item.completed;
      } else {
        return item;
      }
    })

    return (
      <ul className="todo-list">
        {filteredTodos.map(task => (
          <Item task={task} key={task._id} />
        ))}
      </ul>
    );
  }
}
ListItem.contextType = TodoContext;
