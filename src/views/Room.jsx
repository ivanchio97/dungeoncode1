import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Room.css';
import doorImage from '../assets/puerta.png';
import chestImage from '../assets/chest.png';
import SlimeGreen from '../components/SlimeGreen';
import SlimeRed from '../components/SlimeRed';
import SlimeBlue from '../components/SlimeBlue';
import PlayerData from '../components/PlayerData';
import { SlimeData } from '../contexts/SlimeProvider';
import CodeModal from '../views/CodeModal';
import { Data } from '../contexts/DataProvider';
import { toast } from 'react-toastify';
import ModalInfo from '../components/ModalInfo';
import GameOver from '../components/GameOver';
import Advicer from '../components/Advicer';

const Room = () => {

  const navigate = useNavigate();
  const [slimeStates, setSlimeStates] = useContext(SlimeData);
  const { dataPlayer, setDataPlayer } = useContext(Data);
  const [puertasUP, setPuertasUP] = useState([]);
  const numUp = Math.floor(Math.random() * 0) + 1;
  const arrayUp = Array.from({ length: numUp }, (_, index) => index + 1);
  const [chesttop, setChestTop] = useState(Math.floor(Math.random() * 100));
  const [chestleft, setChestLeft] = useState(Math.floor(Math.random() * 1000));
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
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);

  const [slimeRoom, setSlimeRoom] = useState([]);

  useEffect(() => {
    setSlimeStates([true, true, true, true]);
    const newslimes = [];
    for (let i = 0; i < 4; i++) {
      const num = Math.floor(Math.random() * 3);
      newslimes.push(slimes[num]);
    }
    setSlimeRoom(newslimes);

    setDataPlayer(prev => {
      const updated = {
        ...prev,
      chest: true,
      levelProgress: 0,
      shop: prev.shop - 1
      }

      if(updated.shop < 1){
      navigate('/shop')
      }
      return updated;
    })
    
    
    console.log(newslimes)
    console.log(dataPlayer.levelProgress)
  }, []);

  const deleteSlime = (ind, number) => {
    if(dataPlayer.bow == false){
      setShowCodeModal(true);
    }
    else{
      setDataPlayer(prev => ({
        ...prev,
        levelProgress: prev.levelProgress + 1,
        bow:false
      }))
    }
    setDataPlayer((prev) => ({
      ...prev,
      actualEnemy: number,
      
    }));
    const newstates = [...slimeStates];
    newstates[ind] = false;
    setSlimeStates(newstates);
  };

  function showToast(message){
    toast.info(message, {
      position: 'top-right',
      autoClose: 3000,
      closeOnClick: true,
      theme: 'colored',
    });
  }

  function openEvent() {
    const ran = Math.floor(Math.random()*5)
    console.log("Evento elegido: ",ran)
    if (ran === 0) {
      showToast("Encontraste un evento! 😲 ");
      navigate('/event', {replace: true});
  } else if (ran === 1) {
      showToast("Encontraste un evento! 😵 ");
      navigate('/event2', {replace: true});
  } 
    else if(ran === 2){
      showToast("Encontraste un evento! 🥶 ");
      navigate('/event3', {replace: true});
    }
    else if(ran >= 3){
      showToast("Encontraste un evento 💫 ")
      navigate('/event4', {replace: true})
    }
   
  }
  function openNewLevel() {
    setDataPlayer((prev) => ({
      ...prev,
      levelProgress: 0,
      level: prev.level + 1,
    }));
    navigate('/puente')
    setSlimeStates([true, true, true, true]);
    toast.info('¡Has pasado al siguiente nivel! 💥', {
      position: 'top-right',
      autoClose: 3000,
      closeOnClick: true,
      theme: 'colored',
    });
  }

  function goToNextLevel() {
    console.log(dataPlayer.levelProgress);
    if (dataPlayer.levelProgress == 4) {
      const probabilidad = Math.floor(Math.random() * 101);
      console.log(probabilidad);
      if (probabilidad < dataPlayer.eventChance) openEvent();
      else openNewLevel();
    } else {
      alert('¡Aún quedan enemigos por derrotar!');
    }
  }
  function openChest() {
    setShowModalInfo(true);
    setDataPlayer((prev) => ({
      ...prev,
      chest: false,
    }));
  }

  return (
    <div className="fade-in">
     { dataPlayer.lives < 1 ?  <  GameOver /> : <></> }
     <Advicer />
      <div className="level">
        <PlayerData />
        <div className="up">
          {arrayUp.map(() => {
            return (
              <div className="door">
                <img src={doorImage} alt="" onClick={goToNextLevel} />
              </div>
            );
          })}
        </div>
        <div className="down">
          {dataPlayer.chest && (
            <div
              className="chest"
              style={{ top: chesttop, left: chestleft }}
              onClick={openChest}
            >
              <img src={chestImage} alt="" />
            </div>
          )}
        </div>
        <div className="enemies">
          {slimeRoom.map((elemento, index) => {
            return (
              <>
                {showCodeModal && (
                  <CodeModal show={showCodeModal} setShow={setShowCodeModal} />
                )}
                {showModalInfo && (
                  <ModalInfo show={showModalInfo} setShow={setShowModalInfo} />
                )}
                <div
                  key={index}
                  onClick={() => {
                    deleteSlime(index, elemento.number);
                  }}
                >
                  {slimeStates[index] && elemento.component}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;
