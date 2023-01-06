import {createBrowserRouter, RouterProvider} from  'react-router-dom'
import { Home } from '../pages/home'

function Routers(){
     const router = createBrowserRouter([{
        path:'/',
        element:<Home  />
    }]);
   
    return   <RouterProvider router={router} />
}

export {Routers}