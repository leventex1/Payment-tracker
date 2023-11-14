import SecondaryButton from "common/ui/SecondaryButton"

const NotHaveAnAccount : React.FunctionComponent = () => {

    return (
        <p>
            Don't have an account?
            <span style={{ marginLeft: '1rem', textDecoration: 'underline' }}>
                <SecondaryButton 
                    text="Sign Up"
                    to="/sign-up"
                />
            </span>
        </p>
    )
}

export default NotHaveAnAccount;