
//llamando variables
const botonInicio = document.querySelector('#start-button');
const displayContainer = document.querySelector('#display-container');
const scoreContainer= document.querySelector('.score-container');

const botonNext = document.querySelector('#next-button')
const pantallaInicio = document.querySelector('.start-screen')
const userScore = document.querySelector('#user-score');
const botonRestar= document.querySelector('#restart');
const preguntas = document.querySelectorAll('.question')
const contenedorPreguntas = document.querySelector('#container')


let contadorPregunta=0; // esta solo se suma con el 1
let puntaje=0;
let opcioneslista =[];
let preguntasAPI =[];




let respuestasCorrectas =['Green','avion','pera'];





//funcion para display tarjeta segùn el contador pregunta






//funcion para darle next que si el next da hasta cierto limite y mostrar puntaje cuando se alcance



//boton de restart
botonRestar.addEventListener('click', funcionBotonRestart);
function funcionBotonRestart(){
        contadorPregunta=0;
        puntaje=0;
        opcioneslista =[]
        //iniciarJuego();
        displayContainer.classList.add("hide");
        scoreContainer.classList.add("hide");
        botonInicio.classList.remove("hide");
        pantallaInicio.classList.remove("hide");
        RestarSelect(seleccion)

}







//funcion para saber que dificultad escogio

  /*   const imprimirValorDificultad = function () {
        var select = document.getElementById("dificultad");
        var options=document.getElementsByTagName("option");
       console.log(options[select.value].innerHTML)
  return(options[select.value].innerHTML); // quede acà.
 
     
      }


      console.log(imprimirValorDificultad) */

 const seleccion = document.querySelectorAll('#dificultad');
console.log(seleccion)

function sacandoOpciones(){


for (let seleccio of seleccion ){

    seleccio.addEventListener('change', ()=>{
        //const options=document.getElementsByTagName("option");
        
       const resultado =seleccio.value; //
      
        opcioneslista.push(resultado);
        console.log(opcioneslista)
        
      if(opcioneslista.length===3){
        LlamarAPI(opcioneslista[0],opcioneslista[1],opcioneslista[2]); 
        
    }
      

    })
 

}


}
const sacando =sacandoOpciones();

function RestarSelect (seleccion){
    for (let seleccio2 of seleccion){
        seleccio2.selectedIndex=0;
    }

}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

function LlamarAPI(dificultad,categoria,tipopregunta){
   
const URLBase = 'https://opentdb.com/api.php?amount=10';

async function fecthData (urlAPI){
    const response = await fetch(urlAPI); 
    const data= await response.json(); //  esto es lo que se ponìa en el .then  lo que va hacer de retornar datos
    return data
}

const anotherfunction = async(urlAPI)=>{
    try{
        let url;
        if(dificultad==='any'& categoria==='any'& tipopregunta==='any'){
            url = await urlAPI
          console.log(url)
        }
        else if(dificultad==='any' & categoria!='any' & tipopregunta!='any'){
            url = await `${urlAPI}&category=${categoria}&type=${tipopregunta}`;
            console.log(url)
        } 
         else if(categoria==='any' & dificultad!='any' & tipopregunta!='any'){
             url = await `${urlAPI}&difficulty=${dificultad}&type=${tipopregunta}`;
            console.log(url)
        } 
        else if(tipopregunta==='any' & categoria!='any' & dificultad!='any'){
             url = await `${urlAPI}&category=${categoria}&difficulty=${dificultad}`;
            console.log(url)
        }
        else if(dificultad==='any' & categoria==='any'){
            url = await `${urlAPI}&type=${tipopregunta}`;
            console.log(url)
        }
        else if(dificultad==='any'& tipopregunta==='any'){
             url = await `${urlAPI}&category=${categoria}`;
            console.log(url)
        } 
        else if(categoria==='any'& tipopregunta==='any'){
            url = await `${urlAPI}&difficulty=${dificultad}`;
            console.log(url)
        }
        else{
            url = await `${urlAPI}&category=${categoria}&difficulty=${dificultad}&type=${tipopregunta}`;
            console.log(url)
        }
        
        const datos = await fecthData(url); 
        const arrayDatos =datos.results; // pra mostrar resultados y mirar como
        
       const datosUnidos = await arrayDatos.map((result)=>(
    
        
        {
         pregunta: result.question,
         respuestaCorrecta : result.correct_answer,
         respuestaIncorrecta: result.incorrect_answers,
         totalRespuesas: result.incorrect_answers.push(result.correct_answer),
         

       }))
        const datosRandom = await datosUnidos.map( (dato)=>({
             total: shuffle(dato.respuestaIncorrecta) 
        }
           
        ))
         
        console.log(datosRandom)

        



       console.log(datosUnidos)

       const datosCorrectos = await arrayDatos.map((result)=>({
     
        respuestaCorrecta : result.correct_answer,
       
      }))

     


       //function llenar datos y crearla abajo
       displayPreguntas(datosUnidos,datosCorrectos);
    

    }
    catch(error){
        console.log(error);

    }
  

}
anotherfunction(URLBase)

}








// crear funcion de llenar datos a partir de array 

function displayPreguntas(arraydatosP, arrayRepcorrect){
let datosMeter = arraydatosP.map(objeto=> `<div class="container-mid">

<p class="question"> ${objeto.pregunta}: </p>
<button class="option-div"">${objeto.respuestaIncorrecta[0]}</button>
<button class="option-div">${objeto.respuestaIncorrecta[1]}</button>
 <button class="option-div">${objeto.respuestaIncorrecta[2]}</button>
  <button class="option-div">${objeto.respuestaIncorrecta[3]}</button>


</div>`).join('')
 
contenedorPreguntas.innerHTML=datosMeter
const tarjetas = document.querySelectorAll('.container-mid');


function displayTarjeta(contadorPregunta){

    for(let tarjeta of tarjetas){
        tarjeta.classList.add('hide')
    }
    
    tarjetas[contadorPregunta].classList.remove('hide');

}

botonInicio.addEventListener('click', iniciarJuego)
function iniciarJuego(){ // para iniciar el juego
    displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
  botonInicio.classList.add("hide");
  pantallaInicio.classList.add("hide");
 displayTarjeta(contadorPregunta)// que inicie con el primero y luego darle el next
}

botonNext.addEventListener('click',funcionBotonNext);
function funcionBotonNext(){
    
  
    contadorPregunta +=1;
    if(contadorPregunta===tarjetas.length){
        displayContainer.classList.add("hide");

        scoreContainer.classList.remove("hide");
        userScore.innerHTML=`Su puntaje alcanzado es ${puntaje}`
 }else{

        displayTarjeta(contadorPregunta)
    }

}

const opcionesUsuario = document.querySelectorAll('.option-div')


for (let opcion of opcionesUsuario){
opcion.addEventListener('click', verificar)
function verificar(){

     let opciones =  opcion.innerHTML;
    console.log(opciones)

    console.log(arrayRepcorrect[contadorPregunta].respuestaCorrecta);
if(opciones===arrayRepcorrect[contadorPregunta].respuestaCorrecta){
    puntaje +=10
    console.log(puntaje)
}
else{
    puntaje=puntaje
    console.log(puntaje)
}


}


}


/* 
 */



}




 




    