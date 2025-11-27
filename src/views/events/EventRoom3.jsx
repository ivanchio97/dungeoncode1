import React, { useContext, useState } from 'react'
import PlayerData from '../../components/PlayerData'
import maquina from '../../assets/maquina.webp'
import EventBanner from '../../components/EventBanner'
import doorImage from '../../assets/puerta.png';
import { useNavigate } from 'react-router-dom';
import { Data } from '../../contexts/DataProvider';

const EventRoom3 = () => {
    const {dataPlayer, setDataPlayer} = useContext(Data)
    const navigate = useNavigate()
    const [text, setText] = useState("")
    const [intentos, setIntentos] = useState(3)
    const [result, setResult] = useState("")
    const [ganado, setGanado] = useState(false)

    function tryCode(){
     if( text == dataPlayer.coinsCode){
        setGanado(true)
        setIntentos(0)
        setResult("Código correcto, has ganado 70 MONEDAS")
        setDataPlayer(prev => ({
            ...prev,
            coins: prev.coins + 70
        }))
     }
     else{
        setIntentos(prev => {{
            const temp = prev - 1
            if(intentos == 3){
                setResult("Codigo incorrecto...")
            }
            else if(intentos == 2){
                setResult("incorrecto... advertencia... activando modo ataque...")   
            }
            else if(intentos == 1){
                alert("La máquina te ha atacado. Has perdido una vida.")
                setResult("Intruso detectado... destruir")
                setDataPlayer(prev=>({
                    ...prev,
                    lives: prev.lives - 1
                }))
            }
            setText("")
            return temp
            
        }})
        
     }
    }

    function exitShop(){
      navigate("/puente")
    }

  return (
    <div className='level3'>
      <PlayerData />
      <div className="door-shop">
        <img src={doorImage} alt="" onClick={exitShop} />
      </div>
      <div className='event'>
        <EventBanner
            title="La Máquina antigua"
            top={110}
            left={470}
            scale={0.7}
        />

        <img src={maquina} alt="" />
        <div className='info'>
            Te topas con una máquina gigante del tamaño del cuarto, <br/>
            es algo intimidante. ¿Acaso la máquina tiene ojos?  <br />
            <strong>Observas un teclado antiguo y un gran número encima...
             ¿Te animas a escribir?
             <p className={`machine-result ${ganado ? "green" : "" }`}  >{result}</p>
            </strong>

            <div className='machine-code'>
                <input type="text" className='machine-input' placeholder='CODE'
                       value={text} onChange={(e)=> setText(e.target.value) }
                />
               { intentos != 0 ? <button className='try-button' onClick={tryCode}>Probar</button> : <></>  }
            </div>
            
        </div>
      <div className='machine-number'>{intentos}</div>
      </div>
      
    </div>
  )
}

export default EventRoom3
