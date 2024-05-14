import ReactDOM from 'react-dom/client'
import { Signup } from './pages/Signup';
import './global.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { HomePage } from './pages/home';
import { PrivateRoutes } from './utils/PrivateRoutes';
import MyAlbums from './pages/myAlbums';
import Wallet from './pages/wallet';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position='top-right' toastOptions={{ duration: 5000 }} />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path='/' element={<HomePage />} />

          <Route path="" element={<PrivateRoutes />}>
            <Route path='/lading' element={<Landing />} />
            <Route path='/my-albums' element={<MyAlbums />} />
            <Route path='/wallet' element={<Wallet />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.Fragment>
)
