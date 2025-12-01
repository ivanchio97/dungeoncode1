import React, { useContext, useState } from 'react'
import '../../styles/EventRoom.css'
import portal from '../../assets/portal.jfif'
import PlayerData from '../../components/PlayerData'
import EventBanner from '../../components/EventBanner'
import { Data } from '../../contexts/DataProvider'
import { useNavigate } from 'react-router-dom'

const EventRoom4 = () => {

  const { dataPlayer, setDataPlayer } = useContext(Data)

  const navigate = useNavigate()


  function response(answer) {
    if (answer == 1) {
      navigate('/event')
    }
    else if(answer == 2) {
      navigate('/event2')
    }
    else{
      navigate('/event3')
    }
  }
  function go(){
    navigate("/stringsEvent")
  }

  return (
    <div className='level3'>
      <PlayerData />

      <div className='event'>
        
        
        <EventBanner
          title="El portal"
          top={110}
          left={470}
          scale={0.7}
        />

        
        <img src={portal} alt="" />

          <div className='info'>
            <h3>
              Encuentras un gran portal, su inmensidad te hace retroceder un poco <br/>
              <strong>
                ¿A dónde quieres ir?
              </strong>
            </h3>

            <div className='options'>
              <button onClick={() => response(1)}>
                <span > El hombre misterioso</span>
              </button>

              <button onClick={() => response(2)}>
                <span >Los cubos flotantes</span>
              </button>

              <button onClick={() => response(3)}>
                <span >La máquina antigua</span>
              </button>
            </div>
          </div>
        

      </div>
    </div>
  )
}

export default EventRoom4
