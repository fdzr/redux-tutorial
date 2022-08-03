import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { Link } from "react-router-dom";

const PostAuthor = (props) => {
    const users = useSelector(selectAllUsers);
    
    const author = users.find(user => user.id === props.userId)

    return <span>by {author
        ? <Link to={`/user/${props.userId}`}>{author.name}</Link>
        : 'Unknown author'}</span>
}

export default PostAuthor;