import { Link } from "react-router-dom"


interface NavProps {
    search: string;
    setSearch: (search: string) => void;
    handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Nav = (Props: NavProps) => {

    const { search, setSearch, handleKeyDown } = Props;
    return (
        <nav className="bg-black p-3">
            <div className="flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold m-2">User Management</h1>
                <ul className="flex justify-center items-center gap-4 mr-10">
                    <li>
                        <Link to="/" className="text-gray-200 hover:text-white">Users</Link>
                    </li>
                    <li>
                        <Link to='/create' className="text-gray-200 hover:text-white">Create</Link>
                    </li>
                    <input type="text" className="p-2 rounded bg-gray-700 text-white" placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
                </ul>
            </div>

        </nav>
    )
}   
