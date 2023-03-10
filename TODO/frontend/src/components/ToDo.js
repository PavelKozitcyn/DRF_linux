import React from 'react'
import {Link} from "react-router-dom";


const ToDoListItem = ({item, deleteTodo}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.text}</td>
            <td>{item.create}</td>
            <td>{item.project}</td>
            <td>{item.creator}</td>
            <td>
                <button onClick={()=>deleteTodo(item.id)} type="button">
                    Delete
                </button>
            </td>

        </tr>
    )
}

const ToDoList = ({items, deleteTodo}) => {
    //console.log(users)
    return (
        <div>
            <table className="table">
                <tr>
                    <th>Id</th>
                    <th>Text</th>
                    <th>Create</th>
                    <th>Project</th>
                    <th>Creator</th>
                    <th></th>
                </tr>
                {items.map((item) => <ToDoListItem item={item} deleteTodo={deleteTodo} />)}
            </table>
            <Link to='/todo/create/'>Create</Link>
        </div>
    )
}

export default ToDoList
