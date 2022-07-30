import  { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increaseCount, getCount } from "../features/posts/postsSlice"

const Header = () => {
    const dispatch = useDispatch();
    const count = useSelector(getCount)

    return (
        <div className="flex flex-row bg-fuchsia-800 w-screen text-slate-200 relative py-5 top-0 justify-between">
            <h1 className="text-5xl">Redux Blog</h1>
            <nav className="flex mr-10">
                <ul className="flex flex-row items-center">
                    <li className="text-xl mr-4 no-underline hover:underline">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-xl mr-4 no-underline hover:underline">
                        <Link to="post">Post</Link>
                    </li>
                    <li className="text-xl mr-4 no-underline hover:underline">
                        <Link to="user">Users</Link>
                    </li>
                </ul>
                <button
                    onClick={() => dispatch(increaseCount())}
                    className="bg-slate-300
                                text-slate-800
                                px-2 py-1
                                rounded
                                text-2xl">
                    {count}
                </button>
            </nav>
        </div>
    )
}

export default Header;