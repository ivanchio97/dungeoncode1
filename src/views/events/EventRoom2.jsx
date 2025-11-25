import React, { useContext, useState } from 'react'
import '../../styles/EventRoom.css'
import ojos from '../../assets/ojos.webp'
import PlayerData from '../../components/PlayerData'
import EventBanner from '../../components/EventBanner'
import { Data } from '../../contexts/DataProvider'
import { useNavigate } from 'react-router-dom'

const EventRoom2 = () => {

  const { dataPlayer, setDataPlayer } = useContext(Data)

  const navigate = useNavigate()
  const [contenido, setContenido] = useState(null)

  const mensaje1 = (
    <div className='info2'>
      <h3>¡Sabía que aceptarías!</h3>
      <div className="options">
        <button onClick={go} >Jugar</button>
      </div>
    </div>
  )

    const mensaje2 = (
    <div className='info2'>
      <h3>¡Así no funcionan las cosas aquí!. Te lo repito:</h3>
      <strong>¿QUIERES JUGAR?</strong>
      <div className="options">
        <button onClick={go} >Jugar 😳 </button>
      </div>
    </div>
  )


  function response(answer) {
    if (answer === "yes") {
      setContenido(mensaje1)
    }
    else {
      setContenido(mensaje2)
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
          title="El rincón de los cubos flotantes"
          top={110}
          left={470}
          scale={0.7}
        />

        
        <img src={ojos} alt="" />

        
        {contenido ? (
          contenido
        ) : (
          <div className='info'>
            <h3>
              Entras en un cuarto repleto de oscuridad. 
              Unos ojos te miran fijamente. <br/>
              <strong>
                ¡Abre uno!, ¡Abre dos!... ¿Abre todos? <br />
                ¿Quieres jugar a los cubos?
              </strong>
            </h3>

            <div className='options'>
              <button onClick={() => response("yes")}>
                <span className='yes'> Estem... ¿Bueno? </span> - Jugar
              </button>

              <button onClick={() => response("no")}>
                <span className='no'>¡No! 😨</span> - Huir
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default EventRoom2
