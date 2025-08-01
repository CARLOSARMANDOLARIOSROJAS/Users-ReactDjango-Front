import { Link } from "react-router-dom"
import { useLogin } from "../hooks/useLogin";
import { use } from "react";

interface NavProps {
    search: string;
    setSearch: (search: string) => void;
    handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Nav = (Props: NavProps) => {

    const { search, setSearch, handleKeyDown } = Props;

    const { usuario, handleLogout } = useLogin();

    const userId = usuario?.id

    return (
        <nav className="bg-black p-3">
            <div className="flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold m-2">User Management</h1>
                <ul className="flex justify-center items-center gap-4 mr-10">
                    <li>
                        <Link to="/register" className="text-gray-200 hover:text-white">Register</Link>
                    </li>
                    {userId ? (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-gray-200 hover:text-white bg-transparent border-none cursor-pointer"
                            >
                                Log Out
                            </button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" className="text-gray-200 hover:text-white">Login</Link>
                        </li>
                    )}
                    {userId && (
                        <li>
                            <Link to='/create' className="text-gray-200 hover:text-white">Create</Link>
                        </li>
                    )}

                    <input type="text" className="p-2 rounded bg-gray-700 text-white" placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
                </ul>
            </div>

        </nav>
    )
}   
