import Button from "common/ui/Button";
import SecondaryButton from "common/ui/SecondaryButton";
import Logo from "common/brand/Logo";
import CurrentUserContext, { CurrentUserUtilityContext } from "contexts/CurrentUser";
import { useContext } from "react";
import Colors from "data/colors";
import { useNavigate } from "react-router-dom";

const NavBar : React.FunctionComponent = () => {

    const navigator = useNavigate();

    const { currentUser } = useContext(CurrentUserContext);
    const { logoutUser } = useContext(CurrentUserUtilityContext)

    const onLogout = () => {
        logoutUser();
        navigator('/');
    }

    const container : React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
    }

    const actionBar : React.CSSProperties = {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
    }

    const usernameStyle : React.CSSProperties = {
        fontSize: '1.125rem',
        color: Colors.ascent,
    }
    
    return (
        <div style={container}>
            <Logo />

            {   currentUser &&
                <div style={actionBar}>
                    <span style={usernameStyle}>
                        ({currentUser.username})
                    </span>
                    <SecondaryButton 
                        text="Log Out"
                        onClick={onLogout}
                    />
                </div>
            }
            {   !currentUser &&
                <div style={actionBar}>
                    <SecondaryButton 
                        text="Sign In"
                        to="/sign-in"
                    />
                    <Button 
                        text="Sign Up" 
                        to="/sign-up"
                    />
                </div>
            }
        </div>
    )
}

export default NavBar;