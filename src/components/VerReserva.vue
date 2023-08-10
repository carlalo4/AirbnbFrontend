<script>
import axios from 'axios';

export default {
    name: "get-request",
    data() {
        return {
            reserva: null
        };
    },
    created() {
        var parametro = this.$route.params.id;
        console.log(parametro)
        axios.get("https://airbnbbackend-1-h8629053.deta.app/appReserva/reserva", { params: { id: parametro } }).then(response => this.reserva = response.data);
    }
}


</script>

<template>
    <h1> Informacion sobre la Reserva</h1>
    <table class="tabla-Grande" v-if="reserva">
        <tr>

            <td class="celda-Anuncio"><img :src='reserva.vivienda.foto' width="300" /></td>

            <td class="celda-Anuncio">

                <table class="tabla-Info">
                    <tr>
                        <td class="bold-text">Direccion:</td>
                        <td>{{ reserva.vivienda.direccion }}</td>
                    </tr>

                    <tr>
                        <td class="bold-text">Localidad:</td>
                        <td>{{ reserva.vivienda.localidad }}</td>
                    </tr>

                    <tr>
                        <td class="bold-text">Provincia:</td>
                        <td>{{ reserva.vivienda.provincia }}</td>
                    </tr>

                    <tr>
                        <td class="bold-text">Coste Total:</td>
                        <td>{{ reserva.costeTotal }}</td>
                    </tr>

                    <tr>
                        <td class="bold-text">Fecha check-In:</td>
                        <td>{{ reserva.fechaInicio }}</td>
                    </tr>

                    <tr>
                        <td class="bold-text">Fecha check-Out:</td>
                        <td>{{ reserva.fechaFin }}</td>
                    </tr>
                </table>

            </td>

        </tr>
    </table>
</template>

<style>
@import '../assets/mostrarInformacionStyle.css';
</style>