import axios from "axios";
import type { UserLogin } from "../interfaces"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../actions/loginActions";
import type { RootState } from "../app/store";

export const useLogin = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    
    // Acceder al slice de auth, no al de users
    const authUser = useSelector((state: RootState) => state.auth.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Restaurar usuario del localStorage al cargar
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser && !authUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                dispatch(setUserName(parsedUser));
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user'); // Limpiar datos corruptos
            }
        }
    }, [dispatch, authUser]);

    const handleLogin = async (values: UserLogin) => {
        console.log("Login submitted", values);
        // Here you would typically make an API call to log the user in

        try {
            const response = await axios.post('http://localhost:8000/api/users/login/', values);
            console.log('Login successful', response.data);

            if (response.status === 200 || response.status === 201) {
                // Handle successful login, e.g., store token, redirect user, etc.
                const accessToken = response.data.access;


                localStorage.setItem('token', accessToken);
                console.log("User logged in successfully!");

                const { user } = response.data; // Assuming the response contains user data

                // Guardar usuario en Redux y localStorage
                dispatch(setUserName(user));
                localStorage.setItem('user', JSON.stringify(user));

                console.log(user.username, user.email, user.id);

                setSuccess("Login successful!");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }

        } catch (error) {
            console.log('Error during login', error);
            setError("Error logging in");
            setSuccess("");
        }
    }

    // Función para hacer logout
    const handleLogout = () => {
        dispatch(setUserName(null));
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    };

    return {
        success,
        error,
        handleLogin,
        handleLogout,
        usuario: authUser,
    };
}

