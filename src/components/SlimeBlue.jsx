import React, { useEffect, useState } from 'react'
import frame1 from '../assets/slimes/blueSlime1.png'
import frame2 from '../assets/slimes/blueSlime2.png'
import '../styles/SlimeRed.css'

const SlimeBlue = () =>{
  const images = [frame1, frame2]
  const [sprite, setSprite] = useState(images[0])
  const [slimetop, setSlimeTop] = useState(Math.floor(Math.random()*200))
  const [slimeleft, setSlimeLeft] = useState(Math.floor(Math.random()*1000))

  useEffect(()=>{
    const timer = setTimeout(()=>{
      if(sprite == images[0]) setSprite(images[1])
      else setSprite(images[0])

    },800)
  },[sprite])

  return(
    <div className='slime' style={{top:slimetop,left:slimeleft}} >
      <img src={sprite} alt="" />
    </div>
  )
}
export default SlimeBlue