import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams, Link } from "react-router-dom";

const SinglePostPage = () => {
    const { postId } = useParams();
    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <div className="text-5xl text-center mt-5">
                <h2>Post not found!</h2>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center mt-12">
            <div className="border
                        border-solid 
                        border-slate-600
                        rounded-[10px]
                        w-[500px]
                        p-[1em] 
                        my-[0.5em] 
                        ml-0 
                        mr-[0.5em]
                        items-center">
                <h2 className='text-3xl'>{post.title}</h2>
                <p className="italic">{post.body}</p>
                <p className='my-2'>
                    <Link to={`/post/edit/${post.id}`} 
                        className="mr-[0.5rem]
                                   border-b
                                   border-b-slate-500
                                   text-black
                                   cursos-pointer">
                            Edit Post
                    </Link>
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButtons post={post} />
            </div>
        </div>
    )
}

export default SinglePostPage;