
import { Field, Form, Formik } from 'formik'
import { useLogin } from '../hooks/useLogin';

export const Login = () => {

    const { success, error, handleLogin } = useLogin();

    const initialValues = {
        username: '',
        email: '',
        password: ''
    }

    return (
        <div className="flex items-center justify-center h-160 bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-white text-xl font-bold mb-4 text-center">Welcome! Loggin as Admin</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleLogin}
                >
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="username" className='block text-white mb-2'>Username</label>
                            <Field id="username" name="username" placeholder="Enter your username" className="w-full p-2 rounded bg-gray-700 text-white" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className='block text-white mb-2'>Email</label>
                            <Field id="email" name="email" placeholder="Enter your email" className="w-full p-2 rounded bg-gray-700 text-white" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className='block text-white mb-2'>Password</label>
                            <Field id="password" name="password" type="password" placeholder="Enter your password" className="w-full p-2 rounded bg-gray-700 text-white" />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Login</button>
                    </Form>
                </Formik>
                {success && <p className="text-green-500 mt-4">{success}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    )
}
