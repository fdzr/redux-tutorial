import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectAllPosts,
         getPostsStatus,
         getPostsError,
         fetchPosts } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';         

const PostsList = () => {
    const dispatch = useDispatch();
    
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postsStatus === "idle") {
            dispatch(fetchPosts());
        }

    }, [postsStatus, dispatch]);

    let content;
    if (postsStatus === "loading") 
        content = <p>"Loading..."</p>;
    else if (postsStatus === "succeeded") {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    } else if (postsStatus === "failed")
        content = <p>{error}</p>
    
    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-3xl'>Posts</h2>
            {content}
        </div>
    );
};

export default PostsList;
