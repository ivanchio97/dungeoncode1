import { useContext, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Data, DataProvider} from './contexts/DataProvider'
import Room from './views/Room'
import { SlimeProvider} from './contexts/SlimeProvider'
import Menu from './views/Menu'
import { ToastContainer } from 'react-toastify'
import Shop from './views/Shop'
import EventRoom from './views/EventRoom'


function App() {

  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <DataProvider>
        <SlimeProvider>
          <Wrapper />
        </SlimeProvider>
      </DataProvider>
    </BrowserRouter>
    </>
  )
}
function Wrapper(){
  const {dataPlayer, setDataPlayer} = useContext(Data)
  return(
    <Routes>
            <Route path='/' element={<Menu />} />
            <Route path='/game' element={<Room />} key={dataPlayer.level} />
            <Route path="/shop" element={<Shop />} />
            <Route path='/event' element={<EventRoom />} />
    </Routes>
  )
}

export default App
