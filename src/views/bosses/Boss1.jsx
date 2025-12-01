import React, { useState, useEffect } from 'react'
import '../../styles/Boss1.css'
import PlayerData from '../../components/PlayerData'

const Boss1 = () => {

  const [lives, setLives] = useState(3)
  const [colors, setColors] = useState(["red","green","blue","blueviolet"])
  const [mode, setMode] = useState(1)
  const [answer, setAnswer] = useState("")
  const [timer, setTimer] = useState(10)

  useEffect(() => {
    const handleKeyDown = (e) => {
      // evitar teclas especiales
      if (e.key.length === 1) {
        setAnswer(prev => prev + e.key);
      }

      // borrar
      if (e.key === "Backspace") {
        setAnswer(prev => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  const modeColor = (
    <div className='colors'>
      <div className='timer'>{timer}</div>
      {
        colors.map((element)=>{
          return (
            <div style={{background: element}} className='item-color'>
              👀
            </div>
          )
        })
      }
    </div>
  )

  return (
    <div className='boss-level'>
        <PlayerData />
      <div className='boss-img'>
        <div className='boss-lives'>
          {
            Array.from({length: lives}).map(( _ , i )=>{
              return <div> 💖 </div>
            })
          }
        </div>
        { mode == 1 ? <div className='boss-color'>👀</div> : modeColor  }
      </div>
      <div className='boss-game'>
        <h3 className='boss-question'>Pregunta</h3>
        <div className='boss-input'>{answer}</div>
      </div>
    </div>
  )
}

export default Boss1
