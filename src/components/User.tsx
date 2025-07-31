import { UserCard } from "./UserCard";
import type { User as UserType } from "../interfaces";

interface UserProps {
    users: UserType[];
    handleDelete: (id: number) => Promise<void>;
}

export const User = (Props: UserProps) => {

    const { users, handleDelete } = Props;
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
