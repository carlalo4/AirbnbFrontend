import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import ListaAnuncio from '../components/ListaAnuncio.vue'
import VerAnuncio from '../components/VerAnuncio.vue'
import CrearAnuncio from '../components/CrearAnuncio.vue'
import ListaReservas from '../components/ListaReservas.vue'
import VerReserva from '../components/VerReserva.vue'
import VerTiempo from '../components/VerTiempo.vue'
import ListaLogs from '../components/ListaLogs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/listaViviendas',
      name: 'ListaViviendas',
      component: ListaAnuncio
    },
    {
      path: '/listaViviendas/:localidad',
      name: 'ListaViviendasLocalidad',
      component: ListaAnuncio
    },
    {
      path: '/verAnuncio/:id',
      name: 'VerAnuncio',
      component: VerAnuncio
    },
    {
      path: '/crearAnuncio',
      name: 'CrearAnuncio',
      component: CrearAnuncio
    },
    {
      path: '/listaReservas',
      name: 'ListaReservas',
      component: ListaReservas
    },
    {
      path: '/verReserva/:id',
      name: 'VerReservas',
      component: VerReserva
    },
    {
      path: '/verTiempo',
      name: 'VerTiempo',
      component: VerTiempo
    },
    {
      path: '/listaLogs',
      name: 'ListaLogs',
      component: ListaLogs
    }
  ]
})

export default router
