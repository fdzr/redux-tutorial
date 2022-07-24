import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    // let date = new Date().toISOString();

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle";

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus("pending")
                dispatch(addNewPost({ title, body: content, userId })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
            } catch (err) {
                console.error("Failed to save the post", err)
            } finally {
                setAddRequestStatus('idle')
            }

            // dispatch(
            //     postAdded({
            //         id: nanoid(),
            //         title,
            //         content,
            //         date,
            //         userId,
            //         reactions: {
            //             thumbsUp: 0,
            //             wow: 0,
            //             heart: 0,
            //             rocket: 0,
            //             coffee: 0
            //         }
            //     })
            // )
            
           
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <div className="flex flex-col items-center mt-4 mb-7">
            <h2 className="text-4xl">Add a New Post</h2>
            <form action="" 
                  className="flex flex-col w-[400px] mt-4">
                <label htmlFor="postTitle" className="text-xl">Post Title:</label>
                <input 
                    type="text" 
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                    className="border-2 border-slate-600 w-full rounded p-1"
                    />
                <label htmlFor="postAuthor">Author:</label>
                <select 
                    name="postAuthor" 
                    id="postAuthor" 
                    value={userId} 
                    onChange={onAuthorChanged}
                    className="border-2 border-slate-600 w-full rounded p-2.5">
                        <option value="">---</option>
                        {usersOptions}
                </select>
                <label htmlFor="postContent" className="text-xl">Content:</label>
                <textarea 
                    name="postContent" 
                    id="postContent" 
                    value={content}
                    onChange={onContentChanged}
                    className="border-2 border-solid border-slate-600 w-full rounded"
                    />
                <button 
                    type="button"
                    onClick={onSavePostClicked}
                    className="border bg-green-500 rounded-md w-full mt-2 py-1 text-white"
                    disabled={!canSave}>
                    Save Post
                </button>
            </form>
        </div>
    );
};

export default AddPostForm;