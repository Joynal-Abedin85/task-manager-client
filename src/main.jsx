import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from './pages/Mainlayout.jsx';
import Authprovider from './component/Authprovider.jsx';
import Signin from './component/Signin.jsx';
import Signup from './component/Signup.jsx';
import Privateroute from './component/Privateroute.jsx';
import Eror from './pages/Eror.jsx';
import Home from './pages/Home.jsx';
import Addtask from './pages/Addtask.jsx';
import Mytask from './pages/Mytask.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      
      {
        path: '/signin',
        element: <Signin></Signin>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/addtask',
        element: <Privateroute><Addtask></Addtask></Privateroute>
      },
      {
        path: '/mytask',
        element: <Privateroute><Mytask></Mytask></Privateroute>
      }


    ]
  },
  {
    path:'*',
    element: <Eror></Eror>
  }
  
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <RouterProvider router={router} />
    </Authprovider>
  </StrictMode>,
)
