import { useState } from "react"
import axios, {AxiosError} from "axios";


const usePutItem = (onSuccess: () => void) => {

    const [isLoading, setIsLoading] = useState<boolean>();
    const [message, setMessage] = useState<string>('');

    const trigger = async (name: string, amount: number, recursion: number, itemId: number) => {
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.put('http://localhost:5000/items/' + itemId, {
                name, amount: Number(amount), recursion: Number(recursion)
            }, {
                headers: { 'x-access-token': localStorage.getItem('access_token') },
            });
            
            console.log(response);

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

export default usePutItem;