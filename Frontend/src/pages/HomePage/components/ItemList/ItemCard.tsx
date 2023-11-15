import Button from "common/ui/Button"
import SecondaryButton from "common/ui/SecondaryButton"
import Colors from "data/colors"
import ItemContext from "pages/HomePage/contexts/ItemContext"
import { Item } from "pages/HomePage/models"
import { useContext } from "react"
import useLoadAllItems from "pages/HomePage/hooks/loadAllItems"
import useRemoveItem from "pages/HomePage/hooks/RemoveItem"

type Props = {
    item: Item
}
const ItemCard : React.FunctionComponent<Props> = ({ item }) => {

    const { setItems } = useContext(ItemContext);

    const { trigger : loadItems, isLoading : isAload } = useLoadAllItems(setItems);

    const onSuccessRemove = () => {
        loadItems();
    }
    const { trigger : removeItem, isLoading : isRload } = useRemoveItem(onSuccessRemove);


    const onRemove = () => {
        removeItem(item.id);
    }

    const container : React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
        padding: '1rem 2rem',
        borderRadius: '16px',
        boxShadow: `0 4px 5px ${Colors.primary}20`,
    }

    const actionContainer : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'end',
    }

    const nameStyle : React.CSSProperties = {
        fontSize: '1.25rem',
        color: Colors.primary,
    }

    const amountStyle : React.CSSProperties = {
        fontSize: '1rem',
        color: Colors.secondary,
    }

    return (
        <div style={container}>
            <div>
                <h1 style={nameStyle}>
                    {item.name}
                </h1>
                <h2 style={amountStyle}>
                    {item.amount} HUF / {item.recursion} days
                </h2>
            </div>
            <div style={actionContainer}>
                <SecondaryButton 
                    text="edit"
                    to={`/item-update/${item.id}`}
                />
                <Button 
                    text={isRload || isAload ? "Loading..." : "Remove"}
                    onClick={onRemove}
                />
            </div>
        </div>
    )
}

export default ItemCard;