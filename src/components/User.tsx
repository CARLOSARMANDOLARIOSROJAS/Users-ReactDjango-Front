import { useFetchUsers } from "../hooks/useFetchUsers";
import { UserCard } from "./UserCard";


export const User = () => {

    const { users, handleDelete} = useFetchUsers();

    return (
        <ul className="grid grid-cols-4 gap-5 p-4 ">
            {users.map(u => (
                <div key={u.id}>
                    <UserCard user={u} 
                    handleDelete={handleDelete}
                    />
                </div>
            ))}

        </ul>
    )
}
