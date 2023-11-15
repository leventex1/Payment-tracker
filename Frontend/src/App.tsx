
import { BrowserRouter, Route, Routes } from "react-router-dom"

import BaseLayout from "./layouts/BaseLayout"
import HomePage from "./pages/HomePage"
import RegisterPage from "pages/RegisterPage"
import LoginPage from "pages/LoginPage"
import NotFound from "pages/NotFound"
import ItemCreatePage from "pages/ItemCreatePage"
import ItemEditPage from "pages/ItemEditPage"

import { CurrentUserContextProvider } from "contexts/CurrentUser"

function App() {

  const style : React.CSSProperties = {
    maxWidth: '1200px',
    marginInline: 'auto',

    fontFamily: 'Avenir',
  }

  return (
    <CurrentUserContextProvider>
      <div style={style}>
        <BrowserRouter>
          <Routes>

              <Route path="sign-up" element={<RegisterPage />} />
              <Route path="sign-in" element={<LoginPage />} />

              <Route path="/" element={<BaseLayout />}>
                <Route index element={<HomePage />} />
                <Route path="item-create" element={<ItemCreatePage />} />
                <Route path="item-update/:itemId" element={<ItemEditPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>

          </Routes>
        </BrowserRouter>
      </div>
    </CurrentUserContextProvider>
  )
}

export default App
 