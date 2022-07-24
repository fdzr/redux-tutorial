import {useSelector} from 'react-redux';
import { selectAllPosts } from './postsSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = () => {
    const posts = useSelector(selectAllPosts);

    const orderedPosts = posts.slice()
                                    .sort(
                                        (a, b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <div key={post.id} className="border 
                                      border-solid 
                                      border-slate-600
                                      rounded-[10px]
                                      w-[400px]
                                      p-[1em] 
                                      my-[0.5em] 
                                      ml-0 
                                      mr-[0.5em]">
            <h3 className='text-2xl'>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className='postCredit'>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </div>
    ));

    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-3xl'>Posts</h2>
            {renderedPosts}
        </div>
    );
};

export default PostsList;