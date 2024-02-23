let mensaje = document.querySelector('#mensaje');
let encriptarBtn = document.querySelector('#encriptar');
let desencriptarBtn = document.querySelector('#desencriptar');
let mensajeBandeja = document.querySelector('#mensaje-bandeja');
let copiarBtn = document.querySelector('#copiar');
let cierreRedesSocialesBtn = document.querySelector('#btn-redes-sociales');
let palabra_encriptada = ''; 
const rectificacion = /[0-9A-Z-ÁÉÍÓÚÜáéíóúü#$@"'()\[\]{}+*~^-_.:,;<>?¿¡|°¬=&%]/g;
let veces = 0

document.addEventListener('DOMContentLoaded',()=>{
document.querySelector('#cont-redes-sociales').classList.add('mensaje-activado')
})
eventos();

function eventos() {
    encriptarBtn.addEventListener('click', encriptamiento);
    desencriptarBtn.addEventListener('click', desencriptamiento);
    cierreRedesSocialesBtn.addEventListener('click',cierreRedesSociales);
    document.querySelector('#contactame').addEventListener('click',()=>{
        document.querySelector('#cont-redes-sociales').classList.add('mensaje-activado')
    })
}
/* Proceso de encriptamiento de la palabra que digite el usuario */
function encriptamiento() {
    palabra_encriptada = '';
    rectificacion.lastIndex = 0;
    if(!rectificacion.test(mensaje.value)){
        for (const iterator of mensaje.value) {
            switch (iterator) {
                case 'e':
                    palabra_encriptada += "enter";
                    break;
                case 'i':
                    palabra_encriptada += "imes";
                    break;
                case 'a':
                    palabra_encriptada += "ai";
                    break;
                case 'o':
                    palabra_encriptada += "ober";
                    break;
                case 'u':
                    palabra_encriptada += "ufat";
                    break;
                default:
                    palabra_encriptada += iterator;
                    break;
            }
        }
        mensaje.value = '';
        mensajeBandeja.innerHTML = `<div id='cont-mensaje-en-bandeja'><p id='mensaje-en-bandeja'>${palabra_encriptada}</p> <button id="copiar">Copiar</button></div>`;
        let copiarBtn = document.querySelector('#copiar');
        copiarBtn.addEventListener('click', copiarContenido);
    }else{
        swal({
            title: "¡Tu mensaje contiene algún error!",
            text: "Tu mensaje contiene mayuscula,caracteres especiales y/o letras con acentos",
            icon: "warning",
            buttons: "Entiendo...",
          });
    }
    
}
function desencriptamiento() {
    let textoDesencriptado = mensaje.value;
        const sustituciones = {
            'enter': 'e',
            'imes': 'i',
            'ai': 'a',
            'ober': 'o',
            'ufat': 'u'
        };
    
        // Utilizar una expresión regular para buscar todas las coincidencias
        const regex = new RegExp(Object.keys(sustituciones).join('|'), 'g');
    
        // Realizar el reemplazo utilizando la función de sustitución
        textoDesencriptado = textoDesencriptado.replace(regex, (match) => sustituciones[match]);
        // Actualizar el contenido de mensajeBandeja
        mensajeBandeja.innerHTML = `<div id='cont-mensaje-en-bandeja'><p id='mensaje-en-bandeja'>${textoDesencriptado}</p> <button id="copiar">Copiar</button></div>`;
    
        // Volver a agregar el evento de clic al botón de copiar
        let copiarBtn = document.querySelector('#copiar');
        copiarBtn.addEventListener('click', copiarContenido);
    
        mensaje.value = ''
}
function copiarContenido() {
    // Obtener el contenido de #mensaje-bandeja
    let contenidoParaCopiar = document.getElementById('mensaje-en-bandeja').textContent;

    navigator.clipboard.writeText(contenidoParaCopiar).then(()=>{
        swal({
            title: "¡Elemento copiado!",
            text: "texto copiado al portapapeles",
            icon: "success",
            buttons:false,
            timer: 1800
          });
    }).catch((err)=>{
        console.log('Algo ocurrio al momento de copiar: ', err);
    })
}
function cierreRedesSociales() {
    veces++
    document.querySelector('#cont-redes-sociales').classList.remove('mensaje-activado')
    document.querySelector('#contactame').classList.add('contactame-activado')
    if(veces <= 1){
        document.querySelector('#contactame').classList.add('sombra')
    setTimeout(() => {
        document.querySelector('#contactame').classList.remove('sombra')
    }, 2000);

    }
    
}


