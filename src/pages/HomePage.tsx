
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button'
import Swal from 'sweetalert2';



export const HomePage = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        setTimeout(async () => {
            const result = await Swal.fire({
                title: 'Going to login...',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
            });
            navigate('/login');
        }, 1000);
    };



    return (
        <div className='container mx-auto p-4'>
            <div className="flex flex-col items-center justify-center h-100">
                <h1 className='text-4xl text-white font-bold mb-4'>Welcome!</h1>
                <p className='text-lg text-white'>Login to manage all the users</p>
                <Button
                    label="Login"
                    onClick={handleLogin}
                    class='bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-600 transition-colors cursor-pointer'
                ></Button>
            </div>
        </div>
    )
}
