import React, { useState, useEffect, useContext } from 'react'
import '../../styles/Boss1.css'
import PlayerData from '../../components/PlayerData'
import SlimeGreen from '../../components/SlimeGreen'
import SlimeBlue from '../../components/SlimeBlue'
import SlimeRed from '../../components/SlimeRed'
import { Data } from '../../contexts/DataProvider'
import CodeModal from '../CodeModal'
import boss from '../../assets/slimes/morado.gif'

const Boss1 = () => {

  const { dataPlayer, setDataPlayer } = useContext(Data);
  const [lives, setLives] = useState(3)
  const [mode, setMode] = useState(1)
  const [answer, setAnswer] = useState("")
  const [slimeLeft, setSlimeLeft] = useState("")
  const [slimeRight, setSlimeRight] = useState("")
  const [slimeStates, setSlimeStates] = useState([true,true])
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [conteo1, setConteo1] = useState(20)
  const [conteo2, setConteo2] = useState(20)

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(slimeStates[0] == false){
        setConteo1(prev => {
          if(prev > 0){
            return prev - 1
          }
          else{
            generarSlime(1)
            return 25
          }
        }
      )
      }
      if(slimeStates[1] == false){
        setConteo2(prev => {
          if(prev > 0){
            return prev - 1
          }
          else{
            generarSlime(2)
            return 25
          }
        }
      )
      }
    },1000)

    return () => clearInterval(timer);

  },[slimeStates])

    const slimes = [
    {
      number: 1,
      component: <SlimeGreen />,
    },
    {
      number: 2,
      component: <SlimeBlue />,
    },
    {
      number: 3,
      component: <SlimeRed />,
    },
  ];

  useEffect(()=>{
    generarSlime(1)
    generarSlime(2)
  },[])

  function generarSlime(number){
    const copy = slimeStates
    if(number == 1){
      const s1 = Math.floor(Math.random()*3)
      setSlimeLeft(slimes[s1])
      copy[0] = true;
    }
    if(number == 2){
      const s2 = Math.floor(Math.random()*3)
      setSlimeRight(slimes[s2])
      copy[1] = true;
    }

    setSlimeStates(copy)
    
  }
  function deleteSlime(ind,number){
    setShowCodeModal(true)
        setDataPlayer((prev) => ({
      ...prev,
      actualEnemy: number,
    }));
    const newstates = [...slimeStates];
    newstates[ind] = false;
    setSlimeStates(newstates);
  }

  return (
    <div className='boss-level'>
        <PlayerData />
        {showCodeModal && (
          <CodeModal show={showCodeModal} setShow={setShowCodeModal} />
        )}
        <div>{lives}</div>
        <div className='boss'> <img src={boss} alt="" /> </div>
        <div>{conteo1}</div>
        <div>{conteo2}</div>
        <div className='slimes'>
         { slimeStates[0] && <div onClick={()=>deleteSlime(0 ,slimeLeft.number)} >{slimeLeft.component}</div> }
         { slimeStates[1] && <div onClick={()=>deleteSlime(1 ,slimeRight.number)} >{slimeRight.component}</div> }
        </div>
    </div>
  )
}

export default Boss1
