import Button from "common/ui/Button";
import Colors from "data/colors";
import React from "react";

const NotFound : React.FunctionComponent = () => {

    const container : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBlock: '2rem',
    }

    const textStyle : React.CSSProperties = {
        fontSize: '4rem',
        fontWeight: '500',
        lineHeight: '2rem',
        color: Colors.primary,
    }

    const pStyle : React.CSSProperties = {
        fontSize: '1rem',
        color: Colors.secondary,
    }

    return (
        <div style={container}>
            <h1 style={textStyle}>
                404 Page not found.
            </h1>
            <p style={pStyle}>
                Something happend...
            </p>
            <Button
                text="Home Page"
                to="/"
            />
        </div>
    )
}

export default NotFound;