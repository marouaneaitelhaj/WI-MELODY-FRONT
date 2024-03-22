import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import './App.css'
import Navbar from './compenents/Statics/Navbar'
import Artists from './pages/Artists'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { RootState, useAppDispatch } from './state/store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserAction } from './state/auth/authActions'
import AuthRoutes from './utilities/AuthRoutes'
import { MyProfile } from './pages/MyProfile'
import ArtistProfile from './pages/ArtistProfile'
import PrivateRoutes from './utilities/PrivateRoutes'
import Payment from './compenents/payment/Payment'
import { LinearProgress } from '@mui/material'
import ConfirmationPopUp from './compenents/confirmationPopUp/confirmationPopUp'


function App() {
  const { loading } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, [])
  let number = 0;
  return (
    <>
      {loading && (<LinearProgress color='error' />)}
      <BrowserRouter>
        <div className='relative'
          {...(loading ? {
            style: {
              filter: 'blur(5px) brightness(50%)'
            }
          } : {})}
        >
          <img className='fixed -z-10 w-screen object-cover h-screen' src="https://images.pexels.com/photos/2908194/pexels-photo-2908194.jpeg" alt="" />
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/artists" element={<Artists />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/payment/:tierId" element={<PaymentWrapper />} />
              <Route path="/artist/:artistId" element={<ArtistProfileWrapper />} />
            </Route>
            <Route element={<AuthRoutes />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
          <ConfirmationPopUp />
        </div>
      </BrowserRouter >
    </>
  )
}
function ArtistProfileWrapper() {
  const { artistId } = useParams();
  return <ArtistProfile artistId={artistId} />;
}

function PaymentWrapper() {
  const { tierId } = useParams();
  return <Payment tierId={tierId} />;
}

export default App
