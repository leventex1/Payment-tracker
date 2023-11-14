import Colors from "data/colors";
import React, { useState } from "react";

type Props = {
    name: string,
    label: string;
    type: string;
    value: string;
    setValue: (v: string) => void;
    placeholder?: string | undefined;
}

const Input : React.FunctionComponent<Props> = ({ 
    type, 
    name, 
    label, 
    value, 
    setValue,
    placeholder,
}) => {

    const [isHover, setIsHover] = useState(false);

    const container : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    }

    const lableStyle : React.CSSProperties = {
        fontSize: '1rem',
        fontWeight: 'bold',
    }

    const inputStyle : React.CSSProperties = {
        fontSize: '1rem',
        paddingInline: '1rem',
        height: '2.25rem',
        borderRadius: '4px',
        border: `solid 1px ${Colors.primary}`,

        boxShadow: isHover ? `0 0 8px ${Colors.secondary}40` : '',

        transition: 'all 200ms ease',
    }

    return (
        <div style={container}>
            <label
                htmlFor={name}
                style={lableStyle}
            >
                {label}
            </label>
            <input 
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={inputStyle}
                name={name}
                autoComplete={name}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input;