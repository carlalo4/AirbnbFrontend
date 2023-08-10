<script>
import axios from 'axios';

export default {
    name: "get-request",
    data() {
        return {
            reservas: null,
            token: jwt_decode(localStorage.getItem('Token'))
        };
    },
    created() {
        let nombreCorreo = this.token.email;
        let indice = nombreCorreo.indexOf("@");
        // Cortar desde 0 hasta la aparición del @
        let nombreSinCorreo = nombreCorreo.substring(0, indice);
        // Simple GET request using axios
        axios.get("https://airbnbbackend-1-h8629053.deta.app/appReserva/reservas/usernameBuyer", { params: { usernameBuyer: nombreSinCorreo } }).then(response => this.reservas = response.data);
    }
};

</script>


<template>
    <table class="tabla-Todo">
        <tr class="fila-encabezado">
            <td class="celda-img"></td>
            <td class="celda-text">Dirección</td>
            <td class="celda-text">Fecha Entrada</td>
            <td class="celda-text">Fecha Salida</td>
            <td class="celda-text">Coste Total</td>
            <td class="celda-button"></td>
        </tr>
        <tr class="fila" v-for="reserva in reservas" :key="reserva._id">

            <td class="celda-img"><img :src='reserva.vivienda.foto' width="100" height="100"></td>

            <td class="celda-text"> {{ reserva.vivienda.direccion }} </td>

            <td class="celda-text">{{ reserva.fechaInicio }}</td>

            <td class="celda-text">{{ reserva.fechaFin }}</td>

            <td class="celda-text"> {{ reserva.costeTotal }}</td>

            <td class="celda-button"><router-link :to="{ name: 'VerReservas', params: { id: reserva._id } }"><a
                        class="boton_personalizado" href="">Ver reserva</a></router-link></td>

        </tr>
    </table>
</template>


<style>
@import '../assets/listasStyle.css';
</style>