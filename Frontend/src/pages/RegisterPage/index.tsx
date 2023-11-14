import Logo from "common/brand/Logo";
import Colors from "data/colors";
import HaveAnAccount from "./components/HaveAnAccount";
import RegisterForm from "./components/RegisterForm";

const RegisterPage : React.FunctionComponent = () => {

    const style : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div style={style}>
            <Logo />
            
            <div style={{ fontSize: '2rem', color: Colors.ascent}}>Create an account</div>
            <HaveAnAccount />

            <RegisterForm />
        </div>
    )
}

export default RegisterPage;