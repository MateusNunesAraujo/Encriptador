let mensaje = document.querySelector('#mensaje');
let encriptarBtn = document.querySelector('#encriptar');
let desencriptarBtn = document.querySelector('#desencriptar');
let mensajeBandeja = document.querySelector('#mensaje-bandeja');
let copiarBtn = document.querySelector('#copiar');
let palabra_encriptada = ''; 
const rectificacion = /[0-9A-Z-ÁÉÍÓÚÜáéíóúü#$@"'()\[\]{}+*~^-_.:,;<>?¿¡|°¬=&%]/g;


eventos();

function eventos() {
    encriptarBtn.addEventListener('click', encriptamiento);
    desencriptarBtn.addEventListener('click', desencriptamiento);
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
      document.querySelector('#cont-advertencia').classList.add('mensaje-activado')
      setTimeout(() => {
        document.querySelector('#cont-advertencia').classList.remove('mensaje-activado')
      }, 3000);
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
        textoDesencriptado = textoDesencriptado.replace(regex, (match) => sustituciones[match.toLowerCase()]);
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
        document.querySelector('#cont-mensaje-copiado').classList.add('mensaje-activado')
        setTimeout(() => {
          document.querySelector('#cont-mensaje-copiado').classList.remove('mensaje-activado')
        }, 3000);
    }).catch((err)=>{
        console.log('Algo ocurrio al momento de copiar: ', err);
    })
}

