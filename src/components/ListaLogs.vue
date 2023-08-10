<script>
import axios from 'axios';

export default {
    name: "get-request",
    data() {
        return {
            logs: null
        };
    },
    created() {
        axios.get("https://airbnbbackend-1-h8629053.deta.app/appLogs/logs").then(response => this.logs = response.data);
    },
    beforeUpdate(){
        axios.get("https://airbnbbackend-1-h8629053.deta.app/appLogs/logs").then(response => this.logs = response.data);
    }
}

</script>

<template>

    <table class="tabla-Todo">
        <tr class="fila-encabezado">
            <td class="celda-text">Email</td>
            <td class="celda-text">Conexion</td>
            <td class="celda-text">Caducidad</td>
            <td class="celda-text">Token</td>
        </tr>
        <tr class="fila" v-for="log in logs" :key="log._id">
            <td class="celda-text">{{ log.email }}</td>
            <td class="celda-text">{{ log.conexion }}</td>
            <td class="celda-text">{{ log.caducidad }}</td>
            <td class="celda-text truncate-text">{{ log.token }}</td>
        </tr>
    </table>
</template>

<style>
@import '../assets/listasStyle.css';
</style>