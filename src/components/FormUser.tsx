import { Formik, Form, Field } from "formik";

import type { User } from "../interfaces";
import { useFetchUsers } from "../hooks/useFetchUsers";

export const FormUser = () => {

    const { handleSubmit, success, error } = useFetchUsers();

    const initialValues: Omit<User, 'id'> = {
        username: '',
        email: '',
        age: 0
    }

    return (
        <div className="flex items-center justify-center h-160 bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-xl font-bold mb-4 text-center">Create a New User!</h2>
                <Formik initialValues={initialValues}
                    onSubmit={handleSubmit}
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
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create User</button>

                    </Form>
                </Formik>
                {success && <p className="text-green-500 mt-4">{success}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};
