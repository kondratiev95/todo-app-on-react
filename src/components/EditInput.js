import React from "react";

export default class EditInput extends React.Component {
    render() {
        return (
            <li className="edit-item">
                <input 
                    type="text" 
                    className="input-edit"
                    value={this.props.newValue}
                    placeholder={this.props.value}
                    onChange={this.props.onInput}
                    onBlur={this.props.onBlur}
                    onKeyDown={this.props.onInputKeyPress}
                    autoFocus
                />
            </li>
        )
    }
}