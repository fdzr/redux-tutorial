import { useSelector } from 'react-redux';
import { selectPostIds,
         getPostsStatus,
         getPostsError } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';         

const PostsList = () => {
    const orderedPostIds = useSelector(selectPostIds);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    let content;
    if (postsStatus === "loading") 
        content = <p>"Loading..."</p>;
    else if (postsStatus === "succeeded") {
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (postsStatus === "failed")
        content = <p>{error}</p>
    
    return (
        <div className='flex flex-col items-center mt-14'>
            {/* <h2 className='text-3xl'>Posts</h2> */}
            {content}
        </div>
    );
};

export default PostsList;
