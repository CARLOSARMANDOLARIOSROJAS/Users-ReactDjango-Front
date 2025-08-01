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
    const [search, setSearch] = useState("");




    const getUsers = async (search: string = ""): Promise<User[]> => {
        const url = search ? `http://localhost:8000/api/users/?search=${search}` : 'http://localhost:8000/api/users/';
        const response = await axios.get(url);
        setUsers(response.data); // Actualizar el estado también
        return response.data;
    }



    const handleSubmit = async (values: Omit<User, 'id'>) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        // Handle form submission logic here
        console.log("Form submitted", values);
        // You can add your API call here to create a new user
        try {
            const response = await axios.post('http://localhost:8000/api/users/', values, config);
            console.log('User created successfully', response.data);

            if (response.status === 200 || response.status === 201) {
                setSuccess("User created successfully!  ");

                setTimeout(() => {
                    navigate("/", { state: { updated: true } });
                }, 1000);
            }


        } catch (error) {
            console.log('error mandanddo los datos', error);
            setError("Error creating user");
            setSuccess("");

        }
    };



    const handleEdit = async (values: Omit<User, 'id'>) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        if (!id) {
            setError("User ID is required for editing.");
            return;
        }
        // Handle form submission logic here
        console.log("Form submitted", values);
        // You can add your API call here to create a new user
        try {
            const response = await axios.put(`http://localhost:8000/api/users/${id}/`, values, config);
            console.log('User updated successfully', response.data);

            if (response.status === 200 || response.status === 201) {
                setSuccess("User updated successfully!  ");
                setTimeout(() => {
                    navigate("/", { state: { updated: true } });
                }, 1000);
            }


        } catch (error) {
            console.log('error mandanddo los datos', error);
            setError("Error creating user");
            setSuccess("");

        }
    }

    const handleDelete = async (id: number) => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
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
                await axios.delete(`http://localhost:8000/api/users/${id}/`, config);
                setUsers(users.filter(user => user.id !== id));
            }
        } catch (error) {
            console.log(`Error deleting user with id ${id}:`, error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const allUsers = await getUsers();
            setUsers(allUsers);
        }
        fetchData();
    }, []);

    const handleSearch = async () => {
        const filtrados = await getUsers(search);
        setUsers(filtrados);
    }

    useEffect(() => {
        if (search.trim() === "") {
            const loadAll = async () => {
                const allUsers = await getUsers();
                setUsers(allUsers);
            }
            loadAll();
        }
    }, [search]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    }

    return {
        getUsers,
        handleSearch,
        users,
        handleDelete,
        handleSubmit,
        success,
        error,
        handleEdit,
        setSuccess,
        setError,
        id,
        setSearch,
        search,
        handleKeyDown
    }
}
