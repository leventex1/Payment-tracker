import Colors from "data/colors";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | undefined;
    to?: string | undefined;
}

const Button : React.FunctionComponent<Props> = ({ text, onClick, to }) => {

    const [ isHover, setIsHover ] = useState(false);

    const style : React.CSSProperties = {
        display: 'inline',
        padding: '1rem 2rem',
        cursor: 'pointer',
        
        fontFamily: 'Avenir',
        fontSize: '1rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        lineHeight: '1rem',
        
        color: Colors.primary,
        borderColor: Colors.ascent,
        background: Colors.main,
        border: `solid 1px ${Colors.ascent}`,

        borderRadius: isHover ? '4rem' : '4px',

        transition: 'all 200ms ease',
    }

    return (
        <>
            { to === undefined &&
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

export default Button;