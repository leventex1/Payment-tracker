import Colors from "data/colors";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | undefined;
    to?: string | undefined
}

const SecondaryButton : React.FunctionComponent<Props> = ({ text, onClick, to}) => {

    const [ isHover, setIsHover ] = useState(false);

    const style : React.CSSProperties = {
        fontFamily: 'Avenir',
        fontSize: '1rem',
        fontWeight: '400',
        textDecoration: 'none',
        lineHeight: '1rem',
        
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        
        color: isHover ? Colors.main : Colors.secondary,

        transition: 'all 200ms ease',
    }

    return (
        <>
            {   to === undefined &&
                <button
                    style={style}
                    onClick={onClick}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {text}
                </button>
            }
            {   to !== undefined &&
                <Link 
                    style={style}
                    to={to}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {text}
                </Link>
            }
        </>
    )
}

export default SecondaryButton;