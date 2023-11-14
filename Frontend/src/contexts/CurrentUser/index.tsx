import { createContext, useEffect, useState } from "react";
import CurrentUser from "./model";
import axios, {AxiosError} from "axios";


type ContextType = {
    currentUser: CurrentUser | undefined;
    setCurrentUser: (v: CurrentUser) => void;
}
const CurrentUserContext = createContext<ContextType>({ 
    currentUser: undefined, setCurrentUser: () => { }
})

type UtilityContextType = {
    logoutUser: () => void;
    loadUser: () => Promise<void>;
}
export const CurrentUserUtilityContext = createContext<UtilityContextType>({
    logoutUser: () => { },
    loadUser: async () => { },
});

type Props = {
    children: React.ReactNode,
}
export const CurrentUserContextProvider : React.FunctionComponent<Props> = ({ children }) => {

    const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();

    const logoutUser = () => {
        setCurrentUser(undefined);
        localStorage.removeItem('access_token');
    }

    const loadUser = async () => {
        const access_token = localStorage.getItem('access_token');
        console.log('Loadin user... access_token:', access_token);
        if(access_token) {
            try {
                const response = await axios.get('http://localhost:5000/users', {
                    headers: { 'x-access-token': access_token }
                });
                setCurrentUser({
                    created_at: response.data.created_at,
                    updated_at: response.data.updated_at,
                    id: response.data.id,
                    username: response.data.username,
                });
            } catch(e) {
                localStorage.removeItem('access_token');
            }
        }
    }

    useEffect(() => {
        loadUser();
    }, [])


    return (
        <CurrentUserContext.Provider value={
            { currentUser, setCurrentUser }
        }>
            <CurrentUserUtilityContext.Provider value={
                { logoutUser, loadUser }
            }>
            {children}
            </CurrentUserUtilityContext.Provider>
        </CurrentUserContext.Provider>
    )
}

export default CurrentUserContext;