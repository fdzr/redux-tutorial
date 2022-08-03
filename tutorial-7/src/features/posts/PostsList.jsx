import { useSelector } from 'react-redux';
import { selectPostIds } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';
import { useGetPostsQuery } from './postsSlice';

const PostsList = () => {
    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery()

    const orderedPostIds = useSelector(selectPostIds);

    let content;
    if (isLoading) 
        content = <p>"Loading..."</p>;
    else if (isSuccess) {
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (isError)
        content = <p>{error}</p>
    
    return (
        <div className='flex flex-col items-center mt-14'>
            {/* <h2 className='text-3xl'>Posts</h2> */}
            {content}
        </div>
    );
};

export default PostsList;
