import Colors from "data/colors";
import ItemCreateForm from "./components/ItemCreateForm";


const ItemCreatePage : React.FunctionComponent = () => {

    const container : React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div style={container}>
            <h2 style={{ fontSize: '2rem', color: Colors.ascent }}>Crate Item</h2>

            <ItemCreateForm />
        </div>
    )
}

export default ItemCreatePage;