import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import InstagramVideoSimple from './components/VideoPage'
import VolunteerPage from './components/VolunteerPage'



function App() {
  return (
  <>
  <Navbar/>
  <Home/>
  <AboutSection/>
<InstagramVideoSimple/>
<VolunteerPage/>
  </>
  )
}

export default App