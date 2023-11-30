import {crearTabla} from "./tabla.js";
import {Monstruo} from "./monstruo.js";
import {getMonstruo,postMonstruo,updateMonstruo} from "./ajax.js";
import {getMonstruos} from "./fetch.js";
import {deleteMonstruo} from "./axios.js";

const $seccionTabla = document.querySelector(".contenedorTabla");
const $slcTipo = document.getElementById("slcTipo");
const $formulario = document.forms[0];
const $btnAltaModificar = document.querySelector("input[value='Guardar']");
const $btmEliminar = document.querySelector("input[value='Eliminar']");
const $h2Form = document.querySelector("#section-form>form>h2");
const $imgLoader = document.querySelector(".imgLoader");

const $slcTipoFilter = document.getElementById("slcTipoFilter");
const $promedioMiedo = document.getElementById("promedioMiedo");
//const $maximoMiedo = document.getElementById("maximoMiedo");
//const $minimoMiedo = document.getElementById("minimoMiedo");

const $cbTablaNombre = document.getElementById("cbTablaNombre");
const $cbTablaAlias = document.getElementById("cbTablaAlias");
const $cbTablaDefensa = document.getElementById("cbTablaDefensa");
const $cbTablaMiedo = document.getElementById("cbTablaMiedo");
const $cbTablaTipo = document.getElementById("cbTablaTipo");

const URL = "http://localhost:3000/monstruos";

const tiposL = ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre lobo"];
actualizarStorage("tipos",tiposL);
//actualizarChecked();

//actualizarTablaJsonServer($seccionTabla, URL, $imgLoader);
actualizarTablaFiltrado($seccionTabla, URL, $imgLoader);
const tipos = JSON.parse(localStorage.getItem("tipos")) || [];
if(tipos.length)
{
    crearSelect($slcTipo,tipos);
}

$cbTablaNombre.addEventListener("change", function(e){
    actualizarTablaFiltrado($seccionTabla, URL, $imgLoader);
    guardarCheckedStorage();
});
$cbTablaAlias.addEventListener("change", function(e){
    actualizarTablaFiltrado($seccionTabla, URL, $imgLoader);
    guardarCheckedStorage();
});
$cbTablaDefensa.addEventListener("change", function(e){
    actualizarTablaFiltrado($seccionTabla, URL, $imgLoader);
    guardarCheckedStorage();
});
$cbTablaMiedo.addEventListener("change", function(e){
    actualizarTablaFiltrado($seccionTabla, URL, $imgLoader);
    guardarCheckedStorage();
});
$cbTablaTipo.addEventListener("change", function(e){
    actualizarTablaFiltrado($seccionTabla, URL, $imgLoader);
    guardarCheckedStorage();
});

$slcTipoFilter.addEventListener("change", function(){
    let tipoMonstruo = this.options[this.selectedIndex];
    console.log("Option selected: " + tipoMonstruo.value);
    actualizarTablaFiltrado($seccionTabla, URL, $imgLoader)
});

window.addEventListener("click",(e)=>{
    if(e.target.matches("td"))
    {
        const id = e.target.parentElement.dataset.id
        getMonstruo(URL, $imgLoader, id)
        .then((res)=>{
            cargarFormularioMonstruo($formulario,res);
            $btnAltaModificar.value = "Modificar";
            $btmEliminar.classList.remove("oculto");
            $h2Form.textContent = "Modificar/Borrar";
        })
    }
    else if(e.target.matches("input[value='Eliminar']"))
    {
        let id = parseInt($formulario.txtId.value);
        handleDelete(URL,$imgLoader,$seccionTabla,id)
        $btmEliminar.classList.add("oculto");
        $btnAltaModificar.value = "Guardar";
        $h2Form.textContent = "Guardar";
        $formulario.txtId.value = "";
        $formulario.reset();
    }
})

$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();

    console.log("Enviar");
    const{txtId, txtNombre, txtAlterEgo, rdoDefensa, slcTipo, rgMiedo} = $formulario;
    //validar
    if(txtAlterEgo.value === null || txtNombre.value === null || txtAlterEgo.value === "" || txtNombre.value === "")
    {
        Swal.fire({
            title: 'Ups, ha ocurrido un error',
            text: 'No se aceptan campos vacios',
            icon: 'error', 
            confirmButtonText: 'Entendido'
        });
    }
    else
    {
        if(txtId.value === "")
        {
            console.log("Nuevo");
            const newMonstruo = new Monstruo(1, txtNombre.value, slcTipo.value, txtAlterEgo.value, parseInt(rgMiedo.value), rdoDefensa.value)
            delete newMonstruo.id;
            handleCreate(URL,$imgLoader,$seccionTabla,newMonstruo);
        }
        else
        {
            console.log("Actualizar");
            const modificarMonstruo = new Monstruo(parseInt(txtId.value), txtNombre.value, slcTipo.value, txtAlterEgo.value, parseInt(rgMiedo.value), rdoDefensa.value)
            handleUpdate(URL,$imgLoader,$seccionTabla,modificarMonstruo);
            txtId.value = "";
            $btmEliminar.classList.add("oculto");
            $btnAltaModificar.value = "Guardar";
            $h2Form.textContent = "Guardar";
        }
        $formulario.reset();
    }

})
//funciones aux
async function handleCreate (url, loader, divContainer,  newMonstruo)
{
    try
    {
        //vacio
        while(divContainer.hasChildNodes()){
            divContainer.removeChild(divContainer.firstElementChild);
        }
        //agrego
        const data = await postMonstruo(url,loader,newMonstruo);
        console.log(data);
        //cargo
        const arrayMonstruos = await getMonstruos(url,loader);
        //muestro
        divContainer.appendChild(crearTabla(arrayMonstruos));
    }
    catch(e)
    {
        console.log(e);
    }
}
async function handleUpdate(url, loader, divContainer,  editMonstruo)
{
    //vacio
    while(divContainer.hasChildNodes()){
        divContainer.removeChild(divContainer.firstElementChild);
    }
    //modifico
    const data = await updateMonstruo(url,loader,editMonstruo);
    console.log(data);
    //cargo
    const arrayMonstruos = await getMonstruos(url,loader);
    //muestro
    divContainer.appendChild(crearTabla(arrayMonstruos));
}
async function handleDelete(url, loader, divContainer, id)
{
    try
    {
        //vacio
        while(divContainer.hasChildNodes()){
            divContainer.removeChild(divContainer.firstElementChild);
        }
        //elimino
        const data = await deleteMonstruo(url,loader,id);
        //cargo
        const arrayMonstruos = await getMonstruos(url,loader);
        //muestro
        divContainer.appendChild(crearTabla(arrayMonstruos));
    }
    catch(e)
    {
        console.log(e);
    }

}
function actualizarStorage(clave, data)
{
    localStorage.setItem(clave, JSON.stringify(data))
}
function cargarFormularioMonstruo(form, monstruo)
{
    // const{txtId, txtNombre, txtAlterEgo, rdoDefensa, slcTipo, rgMiedo} = $formulario;
    // id, nombre, tipo, alias, miedo, defensa
    form.txtId.value = monstruo.id;
    form.txtNombre.value = monstruo.nombre;
    form.txtAlterEgo.value = monstruo.alias;
    form.rdoDefensa.value = monstruo.defensa;
    form.slcTipo.value = monstruo.tipo;
    form.rgMiedo.value = monstruo.miedo;
}

/*
async function actualizarTablaJsonServer(divContainer,url,loader)
{
    try
    {
        while(divContainer.hasChildNodes()){
            divContainer.removeChild(divContainer.firstElementChild);
        }
        const arrayMonstruos = await getMonstruos(url,loader);
        divContainer.appendChild(crearTabla(arrayMonstruos));
    }
    catch(e)
    {
        console.error(e);
    }
}
*/

function crearSelect($divContainer,data)
{
    const fragmento = document.createDocumentFragment();
    data.forEach(element => {
        const option = document.createElement("option");
        option.textContent = element;
        option.setAttribute("value", element);
        fragmento.appendChild(option);
    });
    $divContainer.appendChild(fragmento);
}

async function actualizarTablaFiltrado(divContainer,url,loader)
{
    try
    {
        while(divContainer.hasChildNodes()){
            divContainer.removeChild(divContainer.firstElementChild);
        }

        const arrayMonstruos = await getMonstruos(url,loader);
        if($slcTipoFilter.value == "Todos")
        {
            obtenerPromedioMiedo($promedioMiedo,arrayMonstruos);
            //obtenerMiedoMaximo($maximoMiedo, arrayMonstruos);
            //obtenerMiedoMinimo($minimoMiedo, arrayMonstruos);
            console.log(arrayMonstruos);

            const arrayOrdenado = ordenarMonstruos(arrayMonstruos);

            const ArrayColumnasMod = filtroColumnasTabla(arrayOrdenado);
            divContainer.appendChild(crearTabla(ArrayColumnasMod));
        }
        else
        {
            const arrayFiltrado = arrayMonstruos.filter(function(element) {
                return element.tipo == $slcTipoFilter.value;
            });
            obtenerPromedioMiedo($promedioMiedo,arrayFiltrado);
            //obtenerMiedoMaximo($maximoMiedo, arrayFiltrado);
            //obtenerMiedoMinimo($minimoMiedo, arrayFiltrado);
            console.log(arrayFiltrado);

            const arrayOrdenado = ordenarMonstruos(arrayFiltrado);

            const ArrayColumnasMod = filtroColumnasTabla(arrayOrdenado);
            divContainer.appendChild(crearTabla(ArrayColumnasMod));
        }
        
    }
    catch(e)
    {
        console.error(e);
    }
}

function filtroColumnasTabla(data)
{
    const newArray = data.map(function(element){
        if(!$cbTablaNombre.checked)
        {
            delete element.nombre;
        }
        if(!$cbTablaAlias.checked)
        {
            delete element.alias;
        }
        if(!$cbTablaDefensa.checked)
        {
            delete element.defensa;
        }
        if(!$cbTablaMiedo.checked)
        {
            delete element.miedo;
        }
        if(!$cbTablaTipo.checked)
        {
            delete element.tipo;
        }
        return element;
    })
    return newArray;
}

function obtenerPromedioMiedo(divContainer,data)
{
    if(data.length === 0)
    {
        divContainer.setAttribute("value", "Promedio");
    }
    else
    {
        let suma = data.reduce(function(acumulador, e) {
            return acumulador + parseInt(e.miedo);
        }, 0);
        let promedio = suma / data.length;
        let promedioRedondeado = promedio.toFixed(2);
        divContainer.setAttribute("value", promedioRedondeado);
    }
}

/*
function obtenerMiedoMaximo(divContainer, data)
{
    if(data.length === 0)
    {
        divContainer.setAttribute("value", "Maximo");
    }
    else
    {
        let miedoMasGrande = data.map(monstruo=>monstruo.miedo).reduce((prev, actual)=>prev > actual ? prev : actual, 0);
        divContainer.setAttribute("value", miedoMasGrande);
    }
}

function obtenerMiedoMinimo(divContainer, data)
{
    if(data.length === 0)
    {
        divContainer.setAttribute("value", "Minimo");
    }
    else
    {
        let miedoMasChico = data.map(monstruo=>monstruo.miedo).reduce((prev, actual)=>prev < actual ? prev : actual, 10);
        divContainer.setAttribute("value", miedoMasChico);
    }
}
*/

function ordenarMonstruos(data)
{
    const newData = data.sort((a,b)=>{
        if(a.miedo == b.miedo)
        {
            return 0;
        }
        if(a.miedo < b.miedo)
        {
            return 1;
        }
        return -1;
    });
    return newData;
}

function guardarCheckedStorage()
{
    let data = [$cbTablaNombre.checked, $cbTablaAlias.checked, $cbTablaDefensa.checked, $cbTablaMiedo.checked, $cbTablaTipo.checked];

    actualizarStorage("checked", data);
}

/*
function actualizarChecked()
{
    const checked = JSON.parse(localStorage.getItem("checked"));

    if(checked.length>0)
    {
        $cbTablaNombre.checked = checked[0];
        $cbTablaAlias.checked = checked[1];
        $cbTablaDefensa.checked = checked[2];
        $cbTablaMiedo.checked = checked[3];
        $cbTablaTipo.checked = checked[4];
    }
    
}
*/


