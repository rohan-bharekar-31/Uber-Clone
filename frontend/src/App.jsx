import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainHome from "./pages/CaptainHome"
import Home from './pages/Home'
import UserProtectionWrapper from './pages/UserProtectionWrapper'
import CaptainProtectionWrapper from "./pages/CaptainProtectionWrapper";
import Riding from './pages/Riding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' element={<UserProtectionWrapper><Home /></UserProtectionWrapper>} />
        <Route path='/captain-home' element={<CaptainProtectionWrapper><CaptainHome/></CaptainProtectionWrapper>} />
        <Route path='/ridding' element={<UserProtectionWrapper><Riding/></UserProtectionWrapper>} />        
      </Routes>
    </div>

  )
}

export default App