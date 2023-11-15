import ItemContext from "pages/HomePage/contexts/ItemContext";
import React, { useContext } from "react";
import ItemCard from "./ItemCard";
import Colors from "data/colors";


const ItemList : React.FunctionComponent = () => {

    const { items, isLoading } = useContext(ItemContext);

    const container : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '3rem',
    }

    return (
        <div style={container}>
            {   isLoading &&
                <p style={{ color: Colors.secondary }}>Loading...</p>
            }
            {   !isLoading &&
                <>
                    {   items.map(item => (
                            <div key={item.id}>
                                <ItemCard item={item} />
                            </div>
                        ))
                    }
                </>
            }
        </div>
    )
}

export default ItemList;