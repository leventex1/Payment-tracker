import Logo from "common/brand/Logo";
import Colors from "data/colors";
import NotHaveAnAccount from "./components/NotHaveAnAccount";
import LoginFrom from "./components/LoginFrom";

const LoginPage : React.FunctionComponent = () => {

    const style : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div style={style}>
            <Logo />
            
            <div style={{ fontSize: '2rem', color: Colors.ascent}}>Log in to your account</div>
            <NotHaveAnAccount />

            <LoginFrom />
        </div>
    )
}

export default LoginPage;