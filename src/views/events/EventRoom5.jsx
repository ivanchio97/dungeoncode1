import React, { useContext, useState } from 'react'
import '../../styles/EventRoom.css'
import fuente from '../../assets/fuente.jfif'
import PlayerData from '../../components/PlayerData'
import EventBanner from '../../components/EventBanner'
import { Data } from '../../contexts/DataProvider'
import { useNavigate } from 'react-router-dom'

const EventRoom5 = () => {

  const { dataPlayer, setDataPlayer } = useContext(Data)
  const [precio, setPrecio] = useState(5)
  const [probabilidad, setProbabilidad] = useState(10)
  const [resultado, setResultado] = useState("")
  const [ganado, setGanado] = useState(false)
  const [contador, setContador] = useState(0)
  const mensajes= [
    "Tiras las monedas... no ocurre nada",
    "Sigues intentando, aun nada",
    "Nada..."
  ]
  const navigate = useNavigate()


  function response(answer) {
    if (answer == 1) {
      probar()
    }
    else{
      go()
    }
  }
  function go(){
    navigate("/game")
  }
  function probar(){
    if(dataPlayer.coins >= precio){
      setResultado("")
          setDataPlayer(prev=>({
            ...prev,
            coins: prev.coins - precio
        }))
      const ran = Math.floor(Math.random()*120)
      if(ran <= probabilidad){
        alert("Has ganado vidas!")
        setResultado("¡Has ganado 💖 x 2!")
        setDataPlayer(prev=>({
          ...prev,
          lives: prev.lives + 2
        }))
        setGanado(true)
      }
      else{
        setGanado(false)
        setResultado(mensajes[contador])
        setPrecio(prev => prev + 1)
        setProbabilidad(prev => prev + 5)
        setContador(prev => {{
          const calc = prev + 1
          if(calc > 2){
            return 0
          }
          else{
            return calc
          }
        }})
        
      }

    }
    else{
      alert("No tienes suficientes monedas")
    }
  }

  return (
    <div className='level3'>
      <PlayerData />

      <div className='event'>
        
        
        <EventBanner
          title="La fuente de los deseos"
          top={110}
          left={470}
          scale={0.7}
        />

        
        <img src={fuente} alt="" />

          <div className='info'>
            <h3>
              Observas en el centro del salón una fuente brillante. 
              Escuchas una voz proveniente del agua. <br/>
              <strong>
                ¿Te sobran monedas? ¿Te sientes con suerte?
              </strong>
            </h3>
            <h3 className={`machine-result ${ganado ? "green" : "" }`}  >{resultado}</h3>
            <div className='options'>
              <button onClick={() => response(1)} className='small-font'>
                <span className='gold' > Pagar {precio} monedas </span> - {probabilidad}% de chance
              </button>

              <button onClick={() => response(2)} className='small-font' >
                <span >Salir</span>
              </button>
            </div>
          </div>
        

      </div>
    </div>
  )
}

export default EventRoom5
