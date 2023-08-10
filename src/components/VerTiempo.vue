<script>
import axios from 'axios';

export default {
    data: function () {
        return {
            resultado: " ",
            resultadoNacional: " ",
            selected: 'A',
            options: [
                { text: 'Albacete', value: '02' },
                { text: 'Alicante', value: '03' },
                { text: 'Almería', value: '04' },
                { text: 'Álava', value: '01' },
                { text: 'Asturias', value: '33' },
                { text: 'Ávila', value: '05' },
                { text: 'Badajoz', value: '06' },
                { text: 'Illes Balears', value: '07' },
                { text: 'Barcelona', value: '08' },
                { text: 'Bizkaia', value: '48' },
                { text: 'Burgos', value: '09' },
                { text: 'Cáceres', value: '10' },
                { text: 'Cádiz', value: '11' },
                { text: 'Cantabria', value: '39' },
                { text: 'Castellón', value: '12' },
                { text: 'Ciudad Real', value: '13' },
                { text: 'Córdoba', value: '14' },
                { text: 'A Coruña', value: '15' },
                { text: 'Cuenca', value: '16' },
                { text: 'Gipuzkoa', value: '20' },
                { text: 'Girona', value: '17' },
                { text: 'Granada', value: '18' },
                { text: 'Guadalajara', value: '19' },
                { text: 'Huelva', value: '21' },
                { text: 'Huesca', value: '22' },
                { text: 'Jaén', value: '23' },
                { text: 'León', value: '24' },
                { text: 'Lleida', value: '25' },
                { text: 'Lugo', value: '27' },
                { text: 'Madrid', value: '28' },
                { text: 'Málaga', value: '29' },
                { text: 'Murcia', value: '30' },
                { text: 'Navarra', value: '31' },
                { text: 'Ourense', value: '32' },
                { text: 'Palencia', value: '34' },
                { text: 'Las Palmas', value: '35' },
                { text: 'Pontevedra', value: '36' },
                { text: 'La Rioja', value: '26' },
                { text: 'Salamanca', value: '37' },
                { text: 'Santa Cruz de Tenerife', value: '38' },
                { text: 'Segovia', value: '40' },
                { text: 'Sevilla', value: '41' },
                { text: 'Soria', value: '42' },
                { text: 'Tarragona', value: '43' },
                { text: 'Teruel', value: '44' },
                { text: 'Toledo', value: '45' },
                { text: 'Valencia', value: '46' },
                { text: 'Valladolid', value: '47' },
                { text: 'Zamora', value: '49' },
                { text: 'Zaragoza', value: '50' },
                { text: 'Ceuta', value: '51' },
                { text: 'Melilla', value: '52' }
            ]
        };
    },
    methods: {
        buscarTiempo(parametro) {
            console.log(parametro)
            axios.get("https://airbnbbackend-1-h8629053.deta.app/appTiempo/tiempo/provincia", { params: { provincia: parametro } }).then(response => this.resultado = response.data);
        }
    },
    created() {
        axios.get("https://airbnbbackend-1-h8629053.deta.app/appTiempo/tiempo/nacional").then(response => this.resultadoNacional = response.data);
    }
}

</script>

<template>
    <table v-if="resultadoNacional" class="tabla-Todo">
        <tr class="filaTiempo">
            <td class="celda">
                <h2>Prevision del tiempo nacional</h2>
            </td>
        </tr>
        <tr class="filaTiempo">
            <td class="celda">
                {{ resultadoNacional }}
            </td>
        </tr>
        <tr class="filaTiempo">
            <td class="celda">
                <h2>Busque una predicción para el tiempo de hoy</h2>
            </td>
        </tr>
        <tr class="filaTiempo">
            <td class="celda">
                <select v-model="selected" class="select-css">
                    <option v-for="option in options" :value="option.value">
                        {{ option.text }}
                    </option>
                </select>

                <a class="botonTiempo" v-on:click="buscarTiempo(selected)">Buscar</a>
            </td>
        </tr>
        <tr class="filaTiempo">
            <td v-if="resultado" class="celda">
                {{ resultado }}
            </td>
        </tr>
    </table>
</template>

<style setup>
@import '../assets/tiempoStyle.css';
</style>