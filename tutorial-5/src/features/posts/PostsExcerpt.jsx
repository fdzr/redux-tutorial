import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from "react-router-dom";

const PostsExcerpt = ({ post }) => {
    return (
        <div className="border
                        border-solid 
                        border-slate-600
                        rounded-[10px]
                        w-[400px]
                        p-[1em] 
                        my-[0.5em] 
                        ml-0 
                        mr-[0.5em]">
            <h2 className='text-3xl'>{post.title}</h2>
            <p className='italic mt-2'>{post.body.substring(0, 75)}...</p>
            <p className='my-2'>
                <Link to={`post/${post.id}`} 
                    className="mr-[0.5rem] 
                               text-black 
                               cursor-pointer 
                               border-b border-b-slate-500">View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </div>
    )
}

export default PostsExcerpt;