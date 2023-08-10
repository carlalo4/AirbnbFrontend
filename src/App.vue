<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      token: localStorage.getItem('Token')
    };
  },
  methods:{
    logout(){
      localStorage.clear()      
      window.location.href='/'
    }
  }
}

</script>

<template>
  <header>
    
      <div class="logo">
        <h2 class="logo-nombre">
          <router-link to="/"> The Good House </router-link>
        </h2>
      </div>

  
      <nav>
        <router-link to="/"> Inicio </router-link>
        <router-link to="/listaViviendas" > Ver Anuncios </router-link>
        <router-link v-if="token" to="/crearAnuncio"> Crear Anuncios </router-link>
        <router-link v-if="token" to="/listaReservas"> Ver Reservas </router-link>
        <router-link v-if="token" to="/listaLogs"> Ver Logs </router-link>
        <button v-if="token" @click="logout">Cerrar Sesión</button>

      
      </nav>

      <div class="logo">
        <a class="g_id_signin" data-type="standard" data-shape="pill" data-size="large" ></a>
      </div>

    
  </header>

  <div padding-top="20px">
      <router-view/>
  </div>

</template>

<style>
  @import './assets/header_style.css'
</style>
