import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Puente = () => {

    const navigate = useNavigate()

    useEffect(()=>{
        navigate('/game')
    })

  return (
    <div>
      Cargando...
    </div>
  )
}

export default Puente
