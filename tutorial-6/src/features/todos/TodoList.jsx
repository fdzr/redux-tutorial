import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useGetTodosQuery } from "../api/apiSlice";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewTodo('');
    }

    const newItemSection = 
        <form onSubmit={handleSubmit}
            className="flex justify-between border border-slate-600 h-20 items-center">
            {/* <label htmlFor="new-todo"
                    className="text-2xl">Enter a new todo item</label> */}
            <div className="w-full px-3">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                    className="border 
                               border-solid
                               border-slate-400
                               rounded
                               w-full
                               p-[0.5rem]
                               rounded-[10px]"
                />
            </div>
            <button 
                className=" min-w-[50px] 
                            max-w-[50px] 
                            border 
                            border-solid 
                            pointer 
                            rounded-[10px]
                            bg-gray-500
                            text-white
                            h-[50px]
                            mr-2">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = JSON.stringify(todos)
    } else if (error) {
        content = <p>{error}</p>
    }

    return (
        <main className="max-w-[600px] m-auto mt-6">
            {newItemSection}
            {content}
        </main>
    )
}

export default TodoList;