import Button from "common/ui/Button";
import Input from "common/ui/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePutItem from "pages/ItemEditPage/hooks/putItem";
import Colors from "data/colors";


type Props = {
    initName: string,
    initAmount: number,
    initRecursion: number,
    itemId: number,
}
const ItemEditForm : React.FunctionComponent<Props> = ({ initName, initAmount, initRecursion, itemId }) => {

    const navigator = useNavigate();

    const [name, setName] = useState<string>(initName);
    const [amount, setAmount] = useState<number>(initAmount);
    const [recursion, setRecursion] = useState<number>(initRecursion);

    const onSuccess = () => {
        navigator('/');
    }

    const { isLoading, message, trigger } = usePutItem(onSuccess);

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        trigger(name, amount, recursion, itemId);
    }

    const container : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    }

    return (
        <form style={container}>

            <Input 
                name="name"
                type="text"
                label="Item name"
                value={name}
                setValue={setName}
            />

            <Input 
                name="amount"
                type="number"
                label="Amount (HUF)"
                value={amount}
                setValue={setAmount}
            />

            <Input 
                name="recursion"
                type="number"
                label="Recursion (days)"
                value={recursion}
                setValue={setRecursion}
            />

            <Button 
                text="Update Item"
                onClick={onSubmit}
            />

            {   isLoading &&
                <p>
                    Loading...
                </p>
            }
            {   !isLoading &&
                <p style={{ color: Colors.error }}>
                    {message}
                </p>
            }

        </form>
    )
}

export default ItemEditForm;