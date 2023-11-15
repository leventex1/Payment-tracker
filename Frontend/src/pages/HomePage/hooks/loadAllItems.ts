import { useState } from "react"
import { Item } from "../models";
import axios, { AxiosError } from "axios";


const useLoadAllItems = (setItems: (v: [Item] | []) => void) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(0);

    const trigger = async () => {
        setStatus(0);
        setIsLoading(true);

        try {
            const response = await axios.get('http://localhost:5000/items', {
                headers: { 'x-access-token': localStorage.getItem('access_token') }
            });

            if(response.data.items) {
                setItems(response.data.items.map((item: Item) => item));
            }
            setStatus(response.status);

        } catch(e) {
            const error = e as AxiosError;
            if(error.response)
                setStatus(error.response?.status);
        }

        setIsLoading(false);
    }


    return { isLoading, status, trigger };
}

export default useLoadAllItems;