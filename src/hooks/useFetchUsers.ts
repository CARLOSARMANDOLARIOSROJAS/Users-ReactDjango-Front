import { useEffect, useState } from "react";
import type { User } from "../interfaces";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export const useFetchUsers = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();



    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get('http://localhost:8000/api/users/');
            setUsers(response.data);
        }
        getUsers();
    }, []);

    const handleSubmit = async (values: Omit<User, 'id'>) => {

        // Handle form submission logic here
        console.log("Form submitted", values);
        // You can add your API call here to create a new user
        try {
            const response = await axios.post('http://localhost:8000/api/users/', values);
            console.log('User created successfully', response.data);

            if (response.status === 200 || response.status === 201) {
                setSuccess("User created successfully!  ");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }


        } catch (error) {
            console.log('error mandanddo los datos', error);
            setError("Error creating user");
            setSuccess("");

        }
    };

    const handleEdit = async (values: Omit<User, 'id'>) => {
        if (!id) {
            setError("User ID is required for editing.");
            return;
        }
        // Handle form submission logic here
        console.log("Form submitted", values);
        // You can add your API call here to create a new user
        try {
            const response = await axios.put(`http://localhost:8000/api/users/${id}/`, values);
            console.log('User updated successfully', response.data);

            if (response.status === 200 || response.status === 201) {
                setSuccess("User updated successfully!  ");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }


        } catch (error) {
            console.log('error mandanddo los datos', error);
            setError("Error creating user");
            setSuccess("");

        }
    }

    const handleDelete = async (id: number) => {
        try {

            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:8000/api/users/${id}/`);
                setUsers(users.filter(user => user.id !== id));
            }
        } catch (error) {
            console.log(`Error deleting user with id ${id}:`, error);
        }
    }



    return {
        users,
        handleDelete,
        handleSubmit,
        success,
        error,
        handleEdit,
        setSuccess,
        setError,
        id
    }
}
