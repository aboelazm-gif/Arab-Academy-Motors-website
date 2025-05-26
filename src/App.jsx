import { RouterProvider,createBrowserRouter,Outlet } from 'react-router-dom';
import  Navbar  from './components/Navbar'
import './App.css'
import Footer from './components/Footer'
import Home from "./pages/Home";
import {NotFound} from "./pages/NotFound"
import {JoinUs} from "./pages/JoinUs"
import { TeamPage } from './pages/TeamPage';
import { SubteamPage } from './pages/SubteamPage';
import { AboutUs } from './pages/AboutUs';

function NavBarWrapper(){
  return (<>
    <Navbar/>
    <Outlet/>
  </>)
}

function App() {
  const router = createBrowserRouter([
    {path:"/",element:<NavBarWrapper />,children:[
      {path:"/",element:<Home/>},
      {path:"*",element:<NotFound/>},
      {path:"/pages/JoinUs.jsx", element:<JoinUs />},
      {path:"/pages/TeamPage.jsx",element:<TeamPage />},
      {path:"/pages/AboutUs.jsx",element:<AboutUs />},
      {path:"/subteam/:subteamName", element:<SubteamPage />}
    ]},
  ])
  return (
      <>
        <RouterProvider router={router}></RouterProvider>
        <Footer/>
      </>
  )
}

export default App
