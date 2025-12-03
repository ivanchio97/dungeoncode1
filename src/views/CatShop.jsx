import React, { useEffect, useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/Shop.css'
import PlayerData from '../components/PlayerData'
import doorImage from '../assets/puerta.png';
import { Data } from '../contexts/DataProvider';
import cat from '../assets/cat.gif'

const CatShop = () => {
    const navigate = useNavigate()
    const productos = [
        { id: 101, nombre: "50 monedas", icono: "💸", costo: 1 , desc: "Otorga 50 monedas", compra: true },
        { id: 102, nombre: "Candado", icono: "🔐", costo: 1, desc: "Agrega dos llaves a tu inventario", compra: true },
        { id: 103, nombre: "duplicador de monedas", icono: "💎", costo: 2, desc: "Duplica tus monedas", compra: true },
        
    ]
    const plantilla = [{},{},{}]
    const {dataPlayer, setDataPlayer} = useContext(Data)
    const [tienda, setTienda] = useState([])
    
useEffect(() => {

  const seleccion = [];
  const usados = new Set();

  plantilla.forEach(() => {
    let rand = Math.floor(Math.random() * productos.length);

    // evitar repetidos
    while (usados.has(rand)) {
      rand = Math.floor(Math.random() * productos.length);
    }

    usados.add(rand);
    seleccion.push(productos[rand]);
  });

  setTienda(seleccion);
}, []);


    function comprar(item){
        setDataPlayer(prev => ({
          ...prev,
          inventory: [...prev.inventory, {
            ...item,
            uid: crypto.randomUUID()
          }],
          lives: prev.lives - item.costo
        }))
      
    }
    function exitShop(){
      navigate("/puente", {replace: true})
    }

  return (
    <div className='level2'>
      <PlayerData />
      <img src={cat} className='cat' />
      <h2>¡Bienvenido a la tienda de Pibble! 😺</h2>
      <div className="door-shop">
        <img src={doorImage} alt="" onClick={exitShop} />
      </div>
      <div className='tienda2'>
        {
          tienda.map((item)=>{
            return(
              <div className='item'>
                <h2 className='icono'>{item.icono}</h2>
                <strong className='nombre'>{item.nombre}</strong>
                <strong className='costo'>{item.costo} 💖 </strong>
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

export default CatShop
