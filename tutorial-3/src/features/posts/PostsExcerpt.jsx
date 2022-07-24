import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

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
            <h3 className='text-2xl'>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p className='postCredit'>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </div>
    )
}

export default PostsExcerpt;