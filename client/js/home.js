import {actualizarCard} from "./card.js";
import {getMonstruos} from "./fetch.js";

const $contenedorCarta = document.querySelector("#cardContainer");
console.log($contenedorCarta);
const $imgLoader = document.querySelector("#mainHome img");
const URL = "http://localhost:3000/monstruos";


getMonstruos(URL,$imgLoader)
.then((res)=>{
    actualizarCard($contenedorCarta,res);
})
.catch((res)=>{
    console.log(res);
})
