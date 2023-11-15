import Button from "common/ui/Button";
import Input from "common/ui/Input";
import { useState } from "react";
import usePostItem from "pages/ItemCreatePage/hooks/postItem";
import { useNavigate } from "react-router-dom";
import Colors from "data/colors";

const ItemCreateForm : React.FunctionComponent = () => {

    const navigator = useNavigate();

    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [recursion, setRecursion] = useState<number>(30);

    const onSuccess = () => {
        navigator('/');
    }

    const { isLoading, message, trigger } = usePostItem(onSuccess);

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        trigger(name, amount, recursion);
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
                text="Create Item"
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

export default ItemCreateForm;