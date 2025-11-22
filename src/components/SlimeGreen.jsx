import React, { useEffect, useState } from 'react'
import frame1 from '../assets/slimes/greenSlime1.png'
import frame2 from '../assets/slimes/greenSlime2.png'
import '../styles/SlimeGreen.css'

const SlimeGreen = () =>{
  const images = [frame1, frame2]
  const [sprite, setSprite] = useState(images[0])
  const [slimetop, setChestTop] = useState(Math.floor(Math.random()*200))
  const [slimeleft, setChestLeft] = useState(Math.floor(Math.random()*1000))
  const [alive, setAlive] = useState(true)


  useEffect(()=>{
    const timer = setTimeout(()=>{
      if(sprite == images[0]) setSprite(images[1])
      else setSprite(images[0])

    },800)
  },[sprite])

  return(
    <>

    { alive && <div className='slimegreen' style={{top:slimetop,left:slimeleft}}   >
      <img src={sprite} alt="" />
    </div> }
    </>
  )
}
export default SlimeGreen 