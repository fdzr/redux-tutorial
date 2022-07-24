import  { Link } from "react-router-dom";

const Header = () => {

    return (
        <div className="flex flex-row bg-fuchsia-800 w-screen text-slate-200 relative py-5 top-0 justify-between">
            <h1 className="text-5xl">Redux Blog</h1>
            <nav className="flex mr-10">
                <ul className="flex flex-row items-center">
                    <li className="text-xl mr-4">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-xl">
                        <Link to="post">Post</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;