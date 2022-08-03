import { useState } from "react";
import { useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../users/usersSlice";
import { useUpdatePostMutation, useDeletePostMutation } from "./postsSlice";

const EditPostForm = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [updatePost, { isLoading }] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)


    if (!post) {
        return (
            <div className="text-5xl text-center mt-5">
                <h2>Post not found!!</h2>
            </div>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                await updatePost({ id: post.id,
                                   title,
                                   body: content,
                                   userId}).unwrap();
                setTitle("")
                setContent("")
                setUserId("")
                navigate(`/post/${postId}`)
            } catch (err) {
                console.log(err)
            }
        }
    }

    const usersOptions = users.map(user => (
        <option 
            key={user.id} 
            value={user.id}>
                {user.name}
        </option>
    ))
    
    const onDeletePostClicked = async () => {
        try {
            await deletePost({ id: post.id }).unwrap();
            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex flex-col max-w-lg mx-auto mt-12">
            <h2 className="text-left text-3xl">Edit Post</h2>
            <form
                className="flex flex-col pt-3 w-[400px]">
                <label htmlFor="" className="text-lg">Post Title:</label>
                <input 
                    type="text" 
                    id="postTitle" 
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                    className="border
                               border-slate-500
                               text-lg"
                    />
                <label htmlFor="postAuthor" className="text-lg mt-3">Author:</label>
                <select name="" 
                    id="postAuthor" 
                    value={userId} 
                    onChange={onAuthorChanged} 
                    className="text-lg 
                               py-2 
                               bg-white 
                               border 
                               border-slate-500">
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent" className="text-lg mt-3">Content:</label>
                <textarea 
                    name="postContent" 
                    id="postContent" 
                    value={content}
                    onChange={onContentChanged}
                    className="border 
                               border-slate-500
                               h-[150px]" />
                <button 
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                    className="text-lg
                               mt-4
                               border
                               border-slate-500
                               rounded " >
                    Save Post
                </button>
                <button 
                    type="button"
                    onClick={onDeletePostClicked}
                    className="text-lg 
                               border 
                               border-slate-300 
                               rounded 
                               bg-red-500
                               text-white
                               mt-2">
                    Delete Post
                </button>
            </form>
        </div>
    )
}

export default EditPostForm;