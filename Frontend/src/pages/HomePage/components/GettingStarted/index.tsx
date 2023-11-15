import Button from "common/ui/Button";
import Colors from "data/colors";

const GettingStarted : React.FunctionComponent = () => {

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

    return (
        <div style={container}>
            <h1 style={textStyle}>
                Get start tracking now.
            </h1>
            <Button 
                text="Sign In"
                to="/sign-in"
            />
        </div>
    )
}

export default GettingStarted;