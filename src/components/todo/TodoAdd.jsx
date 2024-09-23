import { useState } from "react";

const TodoAdd = (props) => {
    const { addNewTodo } = props;

    const [inputValue, setInputValue] = useState("");


    const handleClick = () => {
        addNewTodo(inputValue);
        setInputValue("");
    }

    const handleOnChange = (name) => {
        setInputValue(name);
    }

    return (
        <div className="todo-add">
            <input className="todo-input" type="text" placeholder='Enter your task' 
                onChange={(event) => handleOnChange(event.target.value)} 
                value={inputValue}
            />
            <button className="todo-button" onClick={handleClick}>Add</button>
        </div>
    )
}

export default TodoAdd;