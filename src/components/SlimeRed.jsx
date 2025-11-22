import React, { useEffect, useState } from 'react'
import frame1 from '../assets/slimes/redSlime1.png'
import frame2 from '../assets/slimes/redSlime2.png'
import '../styles/SlimeRed.css'
import CodeModal from '../views/CodeModal'

const SlimeRed = () =>{
  const images = [frame1, frame2]
  const [sprite, setSprite] = useState(images[0])
  const [slimetop, setSlimeTop] = useState(Math.floor(Math.random()*200))
  const [slimeleft, setSlimeLeft] = useState(Math.floor(Math.random()*1000))
  const [showCodeModal, setShowCodeModal] = useState(false)

  const openModal = () =>{
    setShowCodeModal(true)
  }

  useEffect(()=>{
    const timer = setTimeout(()=>{
      if(sprite == images[0]) setSprite(images[1])
      else setSprite(images[0])

    },800)
  },[sprite])

  return(
    <>
    { showCodeModal && <CodeModal show={showCodeModal} setShow = {setShowCodeModal} /> }

    <div className='slime' style={{top:slimetop,left:slimeleft}} onClick={()=>openModal()}  >
      <img src={sprite} alt="" />
    </div>
    </>
  )
}
export default SlimeRed