import { createContext, useEffect, useState } from "react";
import { Item } from "../models";
import useLoadAllItems from "../hooks/loadAllItems";

type ItemContextType = {
    items: [Item] | [];
    setItems: (v: [Item] | []) => void;
    isLoading: boolean,
}
const ItemContext = createContext<ItemContextType>({
    items: [],
    setItems: () => { },
    isLoading: false
});

type Props = {
    children: React.ReactNode;
}
export const ItemContextProvider : React.FunctionComponent<Props> = ({ children }) => {
    
    const [items, setItems] = useState<[Item] | []>([]);

    const { trigger, isLoading } = useLoadAllItems(setItems);

    useEffect(() => {
        trigger();
    }, []);

    return (
        <ItemContext.Provider value={{
            items, setItems, isLoading
        }}>
            {children}
        </ItemContext.Provider>
    )
}

export default ItemContext;