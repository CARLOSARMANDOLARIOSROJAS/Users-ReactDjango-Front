
import { Field, Form, Formik } from 'formik'
import type { User } from '../interfaces';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';

export const EditUser = () => {

    const [userData, setUserData] = useState<Omit<User, 'id'>>({
        username: '',
        email: '',
        age: 0
    });
    const [loading, setLoading] = useState(true);

    const { handleEdit, id, success, error, setError } = useFetchUsers();


    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/users/${id}`);
                const user = response.data;
                setUserData({
                    username: user.username,
                    email: user.email,
                    age: user.age
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError("Error fetching user data");
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [id]);



    return (
        <div className="flex items-center justify-center h-190 bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-xl font-bold mb-4 text-center">Edit User</h2>
                {loading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : (
                    <Formik
                        initialValues={userData}
                        enableReinitialize={true}
                        onSubmit={handleEdit}
                    >
                        <Form>
                            {/* Form fields go here */}
                            <div className="mb-4">
                                <label className="block text-white mb-2" htmlFor="username">Username</label>
                                <Field
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    type="text"
                                    name="username"
                                    id="username"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2" htmlFor="email">Email</label>
                                <Field
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    type="email"
                                    name="email"
                                    id="email"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white mb-2" htmlFor="age">Age</label>
                                <Field
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    type="number"
                                    name="age"
                                    id="age"
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update User</button>
                        </Form>
                    </Formik>
                )}
                {success && <p className="text-green-500 mt-4">{success}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    )
}

