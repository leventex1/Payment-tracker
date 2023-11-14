import { useState } from "react"
import axios, {AxiosError} from "axios";

const useRegister = (
    onSuccess: () => void
) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>('');

    const registerUser = async (
        username: string, 
        email: string, 
        password: string) => {
            
            setIsLoading(true);
            setStatusMessage('');

            try {
                const response = await axios.post('http://localhost:5000/users', {
                    username, email, password
                });
                if(response.status === 200) {
                    onSuccess();
                }
            } catch(e) {
                const error = e as AxiosError;
                const status = error.response?.status;
                if(status === 400)
                    setStatusMessage('Invalid form data.');
                else if(status === 409)
                    setStatusMessage('User already exists.');                    
            }

            setIsLoading(false);

        }

    return { isLoading, statusMessage, registerUser };
}

export default useRegister;