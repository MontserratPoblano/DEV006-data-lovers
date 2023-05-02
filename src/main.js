import { mostrarPokemon, ordenar,ordenarZa,busquedaName,filtradoPorTipo,datosTarjeta, filtradoPorGeneracion } from './data.js';
// import data from './data/lol/lol.js';
import {Objetos} from './data/pokemon/pokemon.js';
// import data from './data/rickandmorty/rickandmorty.js';



let pokemonPantalla=Objetos.pokemon


const btnFiltro = document.querySelectorAll('.filtro-tipo');
const btnGeneracion=document.querySelector("#kanto")
const btnGeneracion2=document.querySelector("#johto")
const btnData = document.getElementById('ver-todos');
const btnAz=document.getElementById('filtrarAz');
const btnZa=document.getElementById('filtrarZa');
const listaPokemon = document.getElementById('listaPokemon');
const iconobusqueda=document.getElementById("icono-busqueda");
const navburger=document.querySelector(".nav-burger");
const navMenu2=document.querySelector(".menu-nav2");
navburger.addEventListener("click", ()=>
  navMenu2.classList.toggle("nav-menu_visible"));
const contenedorPoke=document.querySelector("#lista-pokebola");
const contadorPokemon=document.querySelector(".card-total");
const vaciarPokebola=document.querySelector("#vaciar-pokebola");

  

document.addEventListener('DOMContentLoaded', mostrarPokemon); 

// hay un error en nuestra funcion de mostrar todos solo funciona una vez 
btnData.addEventListener('click', () => {
  listaPokemon.innerHTML = " ";
  mostrarPokemon()
})


btnFiltro.forEach(boton => boton.addEventListener ('click', (e)=> {
  listaPokemon.innerHTML=" ";
  const type=e.currentTarget.id
  pokemonPantalla=filtradoPorTipo(Objetos.pokemon,type)
  mostrarPokemon(pokemonPantalla)
}));


btnAz.addEventListener("click", ()=>{
  listaPokemon.innerHTML=" ";
  const ordenarAzz = ordenar(pokemonPantalla)
  mostrarPokemon(ordenarAzz)
 
 
});

btnZa.addEventListener("click", ()=>{
  listaPokemon.innerHTML = " ";
  const ordenarZaa =  ordenarZa(pokemonPantalla)
  mostrarPokemon(ordenarZaa)
  
});


btnGeneracion.addEventListener("click",(e)=>{
  const generacion=e.target.id;
  pokemonPantalla=filtradoPorGeneracion(Objetos.pokemon,generacion)
  const kanto=pokemonPantalla.length
  const total=Objetos.pokemon.length
  const porciento=kanto * 100/total
  alert("El porcentaje que puedes encontrar de generación Kanto de un total de 251 pokemones es:" + Math.round(porciento)+ "%")
})

btnGeneracion2.addEventListener("click",(e)=>{
  const generacion=e.target.id;
  pokemonPantalla=filtradoPorGeneracion(Objetos.pokemon,generacion)
  console.log(pokemonPantalla)
  const johto=pokemonPantalla.length
  const total=Objetos.pokemon.length
  const porciento=johto * 100/total
  alert("El porcentaje que puedes encontrar de generación Johto de un total de 251 pokemones es:" + Math.round(porciento)+ "%")
})


iconobusqueda.addEventListener("click", ()=>{
  listaPokemon.innerHTML = " ";
  pokemonPantalla = busquedaName();
  mostrarPokemon(pokemonPantalla) 
})


listaPokemon.addEventListener("click",agregarPokemon)
let articulosCarrito=[];

let tipos2=[];
function agregarPokemon(e){
  
  if(e.target.classList.contains("pokebola")){
    const ident=e.target.id
    tipos2=[...tipos2,ident]
    const pokebo=e.target.parentElement.parentElement;
    const datitos=datosTarjeta(pokebo);
    
    const existeEnCarrito=articulosCarrito.some(elemento=>elemento.nombre===datitos.nombre)
    if(existeEnCarrito){
      const pokemones=articulosCarrito.map(elemento=>{
       
        if(elemento.nombre===datitos.nombre){
          elemento.cantidad++;
          return elemento
        }else{
          return elemento;
        }
      });
      articulosCarrito=[...pokemones]
    }else{
      articulosCarrito=[...articulosCarrito,datitos]
      
    }

  
    
    carritoHTML()
    

  }
 
}


function carritoHTML() {
  let totalPokemones=0;
  contenedorPoke.innerHTML = " ";
  
  articulosCarrito.forEach(pokebo => {
    const row = document.createElement('tr');
    row.innerHTML = `

     <td>
     <img src = "${pokebo.imagen}" width = "80">
      
     </td>
  
     <td>${pokebo.nombre}</td>
     <td>${pokebo.cantidad}</td>
     <td>${pokebo.tipo} </td>
     
  `;
   
    contenedorPoke.appendChild(row);
    totalPokemones=totalPokemones+pokebo.cantidad;
    
  });

    contadorPokemon.innerText=totalPokemones
  
  
}








