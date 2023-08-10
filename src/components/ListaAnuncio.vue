<script>
import axios from 'axios';

export default {
    name: "get-request",
    data() {
        return {
            viviendas: null
        };
    },
    created() {
        // Simple GET request using axios
         if (this.$route.params.localidad) {
             var parametro = this.$route.params.localidad;
             parametro = parametro.substring(1, parametro.length);
             axios.get("https://airbnbbackend-1-h8629053.deta.app/appVivienda/viviendas/provincia/" + parametro).then(response => this.viviendas = response.data);
         } else {
             axios.get("https://airbnbbackend-1-h8629053.deta.app/appVivienda/viviendas").then(response => this.viviendas = response.data);
         }

         
        },
     beforeUpdate() {
         // Simple GET request using axios
         if (this.$route.params.localidad) {
             var parametro = this.$route.params.localidad;
             parametro = parametro.substring(1, parametro.length);
             axios.get("https://airbnbbackend-1-h8629053.deta.app/appVivienda/viviendas/provincia/" + parametro).then(response => this.viviendas = response.data);
         } else {
             axios.get("https://airbnbbackend-1-h8629053.deta.app/appVivienda/viviendas").then(response => this.viviendas = response.data);
         }
     }
 };

</script>

<template>
   
    <h2 v-if="this.viviendas.length == 0">
        No existen viviendas en esta provincia
    </h2>
    <table v-else class="tabla-Todo">
        <tr class="fila-encabezado">
            <td class="celda-img"></td>
            <td class="celda-text">Dirección</td>
            <td class="celda-text">Localidad</td>
            <td class="celda-text">Provincia</td>
            <td class="celda-text">Capacidad</td>
            <td class="celda-button"></td>
        </tr>
        <tr class="fila" v-for="vivienda in viviendas" :key="vivienda._id">

            <td class="celda-img"><img :src='vivienda.foto' width="100" height="100"></td>

            <td class="celda-text"> {{ vivienda.direccion }} </td>

            <td class="celda-text">{{ vivienda.localidad }}</td>

            <td class="celda-text">{{ vivienda.provincia }}</td>

            <td class="celda-text">{{ vivienda.capacidad }}</td>

             <td class="celda-button"><router-link :to="{ name: 'VerAnuncio', params: { id: vivienda._id } }"><a
                        class="boton_personalizado" href="">Ver anuncio</a></router-link></td>

        </tr>
    </table> 
</template>

<style>
@import '../assets/listasStyle.css';
</style>