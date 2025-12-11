import React, { useState, useEffect, useContext } from 'react'
import '../../styles/Boss1.css'
import PlayerData from '../../components/PlayerData'
import SlimeGreen from '../../components/SlimeGreen'
import SlimeBlue from '../../components/SlimeBlue'
import SlimeRed from '../../components/SlimeRed'
import { Data } from '../../contexts/DataProvider'
import CodeModal from '../CodeModal'
import boss from '../../assets/slimes/morado.gif'
import BossCode1 from '../../components/BossCode1'
import { toast } from 'react-toastify'

const Boss1 = () => {

  const { dataPlayer, setDataPlayer } = useContext(Data);
  const [lives, setLives] = useState(3)
  const [slimeLeft, setSlimeLeft] = useState("")
  const [slimeRight, setSlimeRight] = useState("")
  const [slimeStates, setSlimeStates] = useState([true,true])
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [conteo1, setConteo1] = useState(25)
  const [conteo2, setConteo2] = useState(25)
  const [show, setShow] = useState(false)
  const [defeated, setDefeated] = useState(true)

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
  useEffect(()=>{
    if(lives < 1){
      showToast("¡Bien has derrotado al slime!")
      setDefeated(true)
    }
  },[lives])

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

    function showToast(message){
      toast.info(message, {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        theme: 'colored',
      });
    }

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
    toast.warning("Rápido! Vence al slime antes de que se genere otro!", {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        theme: 'colored',
      });
    setShowCodeModal(true)
        setDataPlayer((prev) => ({
      ...prev,
      actualEnemy: number,
    }));
    const newstates = [...slimeStates];
    newstates[ind] = false;
    setSlimeStates(newstates);
  }
  function luchar(){
    if( !slimeStates[0]==false || !slimeStates[1]==false ){
      showToast("Debes vencer a los slimes primero!")
    }
    else{
      setShow(true)
    }
  }

  return (
    <div className='boss-level'>
        <PlayerData />
        {defeated && <div className='premio-jefe'>🎁</div> }
      { !defeated && <>
        {show && <BossCode1 show={show} setShow={setShow} setLives = {setLives} /> }
        {showCodeModal && (
          <CodeModal show={showCodeModal} setShow={setShowCodeModal} />
        )}
        <div className='boss-lives'>
          {
            Array.from({length: lives}).map((_,i)=>{
              return <p key={i}>💜</p>
            })
          }
        </div>
         <div className='boss' onClick={luchar} > <img src={boss} alt="" /> </div>
        <div className='contador1' >{conteo1}</div>
        <div className='contador2'>{conteo2}</div>
        <div className='slimes'>
         { slimeStates[0] && <div onClick={()=>deleteSlime(0 ,slimeLeft.number)} >{slimeLeft.component}</div> }
         { slimeStates[1] && <div onClick={()=>deleteSlime(1 ,slimeRight.number)} >{slimeRight.component}</div> }
        </div>
        </>
       }
    </div>
  )
}

export default Boss1
