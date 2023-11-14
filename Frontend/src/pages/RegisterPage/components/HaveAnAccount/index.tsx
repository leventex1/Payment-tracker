import SecondaryButton from "common/ui/SecondaryButton"

const HaveAnAccount : React.FunctionComponent = () => {

    return (
        <p>
            Already have an account?
            <span style={{ marginLeft: '1rem', textDecoration: 'underline' }}>
                <SecondaryButton 
                    text="Sign In"
                    to="/sign-in"
                />
            </span>
        </p>
    )
}

export default HaveAnAccount;