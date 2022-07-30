import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
    const users = useSelector(selectAllUsers);

    const renderedUsers = users.map(user =>  (
        <li key={user.id}>
            <Link to={`/user/${user.id}`} 
                className="underline visited:text-blue-600">
                {user.name}
            </Link>
        </li>
    ))

    return (
        <section className="mt-10 max-w-lg mx-auto">
            <h2 className="text-3xl mb-3">Users</h2>
            <ul>
                {renderedUsers}
            </ul>
        </section>
    );
}

export default UsersList;