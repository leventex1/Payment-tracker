import Button from "common/ui/Button";
import Input from "common/ui/Input";
import { useState } from "react";
import useRegister from "pages/RegisterPage/api";
import Colors from "data/colors";
import { useNavigate } from "react-router-dom";

const RegisterForm : React.FunctionComponent = () => {

    const navigator = useNavigate();

    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const onSuccess = () => {
        navigator('/');
    }

    const { isLoading, statusMessage, registerUser } = useRegister(onSuccess);

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        registerUser(username, email, password);
    }

    const style : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    }

    return (
        <form style={style}>

            <Input 
                name="name"
                type="text"
                label="Username"
                value={username}
                setValue={setUsername}
            />

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
                text="Sign Up"
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

export default RegisterForm;