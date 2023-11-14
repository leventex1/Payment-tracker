import Colors from "data/colors";
import { Link } from "react-router-dom";

const Logo : React.FunctionComponent = () => {

    const containe : React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        textDecoration: 'none',
        cursor: 'pointer',
    }

    const icon : React.CSSProperties = {
        color: Colors.ascent,
    }

    const name : React.CSSProperties = {
        color: Colors.primary,
    }

    return (
        <Link 
            to='/'
            style={containe}
        >
            <h2 style={icon}>{'>'}</h2>
            <h2 style={name}>KTracK</h2>
        </Link>
    )
}

export default Logo;