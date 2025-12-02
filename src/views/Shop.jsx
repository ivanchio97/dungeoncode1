import React, { useEffect, useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/Shop.css'
import PlayerData from '../components/PlayerData'
import doorImage from '../assets/puerta.png';
import { Data } from '../contexts/DataProvider';

const Shop = () => {
    const navigate = useNavigate()
    const productos = [
        { id: 1, nombre: "Vida extra", icono: "💖", costo: 20 , desc: "Otorga una vida extra. No olvides activarla primero", compra: true },
        { id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true },
        { id: 3, nombre: "Cofre x2", icono: "🧱", costo: 10 , desc: "Duplica las monedas del proximo cofre que abras", compra: true },
        { id: 4, nombre: "Arco", icono: "🏹", costo: 25, desc: "Elimina directamente al siguiente slime que elijas", compra: true },
        { id: 5, nombre: "Gamepad", icono: "🎮", costo: 20, desc: "Aumenta la probabilidad general de encontrar más eventos", compra: true },
        { id: 6, nombre: "Avance", icono: "⏩", costo: 10, desc: "Disminuye en 1 la cercanía a la proxima tienda", compra: true },
        { id: 7, nombre: "Portal", icono: "🌀", costo: 20, desc: "Lleva directamente al portal cuando se activa", compra: true },
        { id: 8, nombre: "Tienda", icono: "💰", costo: 5, desc: "Lleva directamente a la tineda", compra: true }
        
    ]
    const plantilla = [{},{},{}, {}]
    const {dataPlayer, setDataPlayer} = useContext(Data)
    const [tienda, setTienda] = useState([])
    
useEffect(() => {
  const randomshop = Math.floor(Math.random() * 3) + 4;
  setDataPlayer(prev => ({
    ...prev,
    shop: randomshop
  }));

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
      navigate("/puente", {replace: true})
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
