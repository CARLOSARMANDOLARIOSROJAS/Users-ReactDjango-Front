import { Link } from "react-router-dom"

export const Nav = () => {
    return (
        <nav className="bg-black p-3">
            <div className="flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold m-2">User Management</h1>
                <ul className="flex gap-4 mr-10">
                    <li>
                        <Link to="/" className="text-gray-200 hover:text-white">Users</Link>
                    </li>
                    <li>
                        <Link to='/create' className="text-gray-200 hover:text-white">Create</Link>
                    </li>
                </ul>
            </div>

        </nav>
    )
}   
