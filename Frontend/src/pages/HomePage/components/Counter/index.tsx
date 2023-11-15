import Colors from "data/colors";
import ItemContext from "pages/HomePage/contexts/ItemContext";
import { useContext, useMemo } from "react";

const Counter : React.FunctionComponent = () => {

    const { items, isLoading } = useContext(ItemContext);

    const calculateSum = () => {
        let sum = 0;
        for(const item of items)
            sum += item.amount / item.recursion;
        return Math.round(sum);
    }

    const count = useMemo<number>(calculateSum, [items]);

    const container : React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '220px',
        aspectRatio: '1 / 1',
        borderRadius: '200px',
        border: `solid 4px ${Colors.ascent}`,
    }

    const textStyle : React.CSSProperties = {
        color: Colors.primary,
        fontSize: '2rem',
    }

    return (
        <div style={container}>
            <h1 style={textStyle}>
                {isLoading ? '...' : count} HUF/day
            </h1>
        </div>
    )
}

export default Counter;