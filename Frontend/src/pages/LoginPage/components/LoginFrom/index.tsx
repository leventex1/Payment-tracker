import Button from "common/ui/Button";
import Input from "common/ui/Input";
import { useState } from "react";
import useLogin from "pages/LoginPage/api";
import Colors from "data/colors";
import { useNavigate } from "react-router-dom";

const LoginFrom : React.FunctionComponent = () => {

    const navigator = useNavigate();

    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const onSuccess = () => {
        navigator('/');
    }

    const { isLoading, statusMessage, loginUser } = useLogin(onSuccess);

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        loginUser(email, password);
    }

    const style : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    }

    return (
        <form style={style}>

            <Input 
                name="email"
                type="email"
                label="Email Address"
                value={email}
                setValue={setEmail}
            />

            <Input 
                name="password"
                type="password"
                label="Password"
                value={password}
                setValue={setPassword}
            />

            <Button 
                text="Sign In"
                onClick={onSubmit}
            />

            {   isLoading &&
                <p>
                    Loading...
                </p>
            }
            {   !isLoading &&
                <p style={{ color: Colors.error }}>
                    {statusMessage}
                </p>
            }
        </form>
    )
}

export default LoginFrom;