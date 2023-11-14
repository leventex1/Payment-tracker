import { useContext, useState } from "react"
import axios, {AxiosError} from "axios";
import CurrentUserContext from "contexts/CurrentUser";

const useLogin = (
    onSuccess: () => void
) => {

    const { setCurrentUser } = useContext(CurrentUserContext);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>('');

    const loginUser = async (
        email: string, 
        password: string
    ) => {
            
            setIsLoading(true);
            setStatusMessage('');

            try {
                const response = await axios.post('http://localhost:5000/auth/login', {
                    email, password
                });
                const access_token = response.data.access_token;
                localStorage.setItem('access_token', access_token);

                const response_user = await axios.get('http://localhost:5000/users', {
                    headers: {
                        'x-access-token': access_token
                    }
                });
                setCurrentUser({
                    created_at: response_user.data.created_at,
                    updated_at: response_user.data.updated_at,
                    id: response_user.data.id,
                    username: response_user.data.username,
                });

                onSuccess();
            } catch(e) {
                const error = e as AxiosError;
                const status = error.response?.status;
                if(status === 400)
                    setStatusMessage('Invalid form data.');
                else
                    setStatusMessage('Ivalid authentication.');                    
            }

            setIsLoading(false);

        }

    return { isLoading, statusMessage, loginUser };
}

export default useLogin;