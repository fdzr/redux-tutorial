import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { 
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation 
} from "../api/apiSlice";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()

    const [ addTodo ] = useAddTodoMutation();
    const [ updateTodo ] = useUpdateTodoMutation();
    const [ deleteTodo ] = useDeleteTodoMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ userId: 1, title: newTodo, completed: false })
        setNewTodo('');
    }

    const newItemSection = 
        <form onSubmit={handleSubmit}
            className="flex justify-between border border-slate-600 h-20 items-center mb-3">
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
                            mr-2
                            hover:bg-green-500">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = todos.map(todo => {
            return (
                <article key={todo.id} 
                    className="p-[1rem]
                                flex
                                flex-row
                                justify-between
                                items-center
                                border
                                border-solid
                                border-slate-300
                                ">
                    <div className="flex
                                    justify-start
                                    items-center">
                        <input 
                            type="checkbox" 
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                            className="w-6
                                       h-6
                                       mr-[1rem]"
                        />
                        <label htmlFor={todo.id} className="text-xl">{todo.title}</label>
                    </div>
                    <button className="border
                                       border-solid
                                       border-slate-400
                                       rounded-[8px]" 
                            onClick={() => deleteTodo({ id: todo.id})}>
                        <FontAwesomeIcon 
                            icon={faTrash} 
                            className="text-pink-500
                                        px-3
                                        py-3
                                        "/>
                    </button>
                </article>
            )
        })
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <main className="max-w-[600px] m-auto mt-6">
            <h1 className="text-5xl mb-3">Todo list</h1>
            {newItemSection}
            {content}
        </main>
    )
}

export default TodoList;