import { Outlet } from "react-router-dom";

import NavBar from "common/layouts/NavBar";

const BaseLayout : React.FunctionComponent = () => {

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default BaseLayout;