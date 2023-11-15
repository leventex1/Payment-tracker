import Colors from "data/colors";
import ItemEditForm from "./components/ItemEditForm";
import useGetItem from "./hooks/getItem";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Item } from "./models";

const ItemEditPage : React.FunctionComponent = () => {

    const { itemId } = useParams();
    const [item, setItem] = useState<Item | undefined>();

    const { trigger : loadTrigger } = useGetItem(setItem);

    useEffect(() => {
        loadTrigger(Number(itemId));
    }, [])

    const container : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div style={container}>
            <h2 style={{ fontSize: '2rem', color: Colors.ascent }}>Crate Item</h2>

            {   item === undefined &&
                <p style={{ color: Colors.secondary }}>Loading...</p>
            }
            {   item &&
                <ItemEditForm
                    initName={item.name}
                    initAmount={item.amount}
                    initRecursion={item.recursion}
                    itemId={item.id}
                />
            }

        </div>
    )
}

export default ItemEditPage;