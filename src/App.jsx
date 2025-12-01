import { useContext, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Data, DataProvider} from './contexts/DataProvider'
import Room from './views/Room'
import { SlimeProvider} from './contexts/SlimeProvider'
import Menu from './views/Menu'
import { ToastContainer } from 'react-toastify'
import Shop from './views/Shop'
import EventRoom from './views/events/EventRoom'
import EventRoom2 from './views/events/EventRoom2'
import StringsEvent from './views/events/StringsEvent'
import Puente from './views/Puente'
import EventRoom3 from './views/events/EventRoom3'
import Boss1 from './views/bosses/Boss1'
import EventRoom4 from './views/events/EventRoom4'


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
            <Route path='/event2' element = {<EventRoom2 />} />
            <Route path='/stringsEvent' element = {<StringsEvent />} />
            <Route path='/puente' element={<Puente />} />
            <Route path='/event3' element={<EventRoom3 />} />
            <Route path='/event4' element={<EventRoom4 />} />
            <Route path='/boss1' element={<Boss1 /> } />
    </Routes>
  )
}

export default App
