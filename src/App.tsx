import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './compenents/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <>
      <div className='relative'>
        <img className='fixed brightness-50 -z-10 w-screen object-cover h-screen' src="https://images.squarespace-cdn.com/content/v1/615b8ec3ba394c7a1db66e7b/1650986379711-CRLLL0WPPU7ATP71IAWA/DSC08789.jpg" alt="" />
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}

export default App
