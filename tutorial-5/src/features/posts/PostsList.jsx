import { useSelector } from 'react-redux';
import { selectAllPosts,
         getPostsStatus,
         getPostsError } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';         

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    let content;
    if (postsStatus === "loading") 
        content = <p>"Loading..."</p>;
    else if (postsStatus === "succeeded") {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
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
