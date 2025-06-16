import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import Donate from './Components/Donate/Donate.jsx'
import Admin from './Components/Admin/Admin.jsx'
import Gallery from './Components/Gallery/Gallery.jsx'
import Team from './Components/Team/Team.jsx'
import Reports from './Components/Reports/Reports.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='donate' element={<Donate />} />
      <Route path='Admin' element={<Admin />} />
      <Route path='Gallery' element={<Gallery />} />
      <Route path='Team' element={<Team/>}/>
      <Route path='Reports' element={<Reports/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
