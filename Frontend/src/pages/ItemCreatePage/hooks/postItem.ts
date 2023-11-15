import { useState } from "react"
import axios, {AxiosError} from "axios";


const usePostItem = (onSuccess: () => void) => {

    const [isLoading, setIsLoading] = useState<boolean>();
    const [message, setMessage] = useState<string>('');

    const trigger = async (name: string, amount: number, recursion: number) => {
        setIsLoading(true);
        setMessage('');

        try {
            await axios.post('http://localhost:5000/items', {
                name, amount, recursion
            }, {
                headers: { 'x-access-token': localStorage.getItem('access_token') },
            });
            
            onSuccess();
        } catch(e) {
            const error = e as AxiosError;
            const status = error.response?.status;
            console.log(error);
            if(status === 400)
                setMessage('Invalid form data.');
            else
                setMessage('Please log out and log in again.');
        }

        setIsLoading(false);
    }

    return { isLoading, message, trigger };
}

export default usePostItem;