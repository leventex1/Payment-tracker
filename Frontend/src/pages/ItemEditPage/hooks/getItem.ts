import { useState } from "react"
import axios from "axios";
import { Item } from "../models";

const useGetItem = (setItem: (v: Item) => void) => {

    const [isLoading, setIsLoading] = useState<boolean>();

    const trigger = async (id: number) => {
        setIsLoading(true);

        try {
            const response = await axios.get('http://localhost:5000/items/' + id, {
                headers: { 'x-access-token': localStorage.getItem('access_token') },
            });
            
            if(response.data.item)
                setItem(response.data.item);
            
        } catch(e) {
            console.log(e);
        }

        setIsLoading(false);
    }

    return { isLoading, trigger };
}

export default useGetItem;