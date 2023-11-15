import axios from 'axios';
import { useState } from 'react';

const useRemoveItem = (onSuccess: () => void) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const trigger = async (id: number) => {
        setIsLoading(true);

        try {
            await axios.delete('http://localhost:5000/items/' + id, {
                headers: { 'x-access-token': localStorage.getItem('access_token') }
            });

            onSuccess();
        } catch(e) {
            console.log(e);
        }

        setIsLoading(false);
    }

    return { isLoading, trigger }

}

export default useRemoveItem;