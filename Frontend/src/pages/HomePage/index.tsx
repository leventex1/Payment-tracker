import CurrentUserContext from "contexts/CurrentUser";
import { useContext } from "react";

import GettingStarted from "./components/GettingStarted";
import ItemList from "./components/ItemList";
import Counter from "./components/Counter";

import { ItemContextProvider } from "./contexts/ItemContext";
import Button from "common/ui/Button";

const HomePage : React.FunctionComponent = () => {

    const { currentUser } = useContext(CurrentUserContext);

    const container : React.CSSProperties = {
        width: 'min(800px, 100%)',
        margin: '1rem auto',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-between',
    }

    return (
        <div>
            {   !currentUser &&
                <GettingStarted />
            }
            {   currentUser &&
                <ItemContextProvider>
                    <div style={container}>
                        <div>
                            <Button 
                                text="Add Item"
                                to="/item-create"
                            />
                            <ItemList />
                        </div>
                        <Counter/>
                    </div>
                </ItemContextProvider>
            }
        </div>
    )
}

export default HomePage;