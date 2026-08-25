import './style.css'
import { UsuariosApp } from './usuarios/usuarios-app'


document.querySelector('#app').innerHTML = `
  <div>
    <div class="card">

    </div>
  </div>
  
`
const elemento = document.querySelector('.card');

UsuariosApp( elemento );