import React, { useEffect, useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/Shop.css'
import PlayerData from '../components/PlayerData'
import doorImage from '../assets/puerta.png';
import { Data } from '../contexts/DataProvider';

const Shop = () => {
    const navigate = useNavigate()
    const productos = [
        { id: 1, nombre: "Vida extra", icono: "💖", costo: 20 , desc: "Otorga una vida extra", compra: true },
        { id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true },
        { id: 3, nombre: "Cofre x2", icono: "🧱", costo: 10 , desc: "Duplica las monedas del proximo cofre que abras", compra: true },
        { id: 4, nombre: "Arco", icono: "🏹", costo: 30, desc: "Elimina directamente al siguiente slime que elijas", compra: true },
        { id: 5, nombre: "Gamepad", icono: "🎮", costo: 30, desc: "Aumenta la probabilidad general de encontrar más eventos", compra: true }
    ]
    const plantilla = [{},{},{}]
    const {dataPlayer, setDataPlayer} = useContext(Data)
    const [tienda, setTienda] = useState([])
    useEffect(()=>{
      const seleccion = plantilla.map(()=>{
        const rand = Math.floor(Math.random()*productos.length)
        return productos[rand]
      })
      setTienda(seleccion)

    },[])

    function comprar(item){
      if (dataPlayer.coins >= item.costo ){
        setDataPlayer(prev => ({
          ...prev,
          inventory: [...prev.inventory, {
            ...item,
            uid: crypto.randomUUID()
          }],
          coins: prev.coins - item.costo
        }) )
      }
      else{
        alert("¡No tienes suficientes monedas!")
      }
    }
    function exitShop(){
      setDataPlayer(prev => ({
        ...prev,
        level: prev.level + 1
      }))
      navigate("/game")
    }

  return (
    <div className='level2'>
      <PlayerData />
      <h2>¡Bienvenido a la tienda! 🤑</h2>
      <div className="door-shop">
        <img src={doorImage} alt="" onClick={exitShop} />
      </div>
      <div className='tienda'>
        
        {
          tienda.map((item)=>{
            return(
              <div className='item'>
                <h2 className='icono'>{item.icono}</h2>
                <strong className='nombre'>{item.nombre}</strong>
                <strong className='costo'>${item.costo}</strong>
                <small>{item.desc}</small>
                <button onClick={()=>comprar(item)} >COMPRAR</button>
              </div>
            )

          })
        }
      </div>
    </div>
  )
}

export default Shop
