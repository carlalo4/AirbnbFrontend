<script>

import axios from 'axios';
import { GoogleMap, Marker } from 'vue3-google-map';

export default{
  name: "get-request",
  components: {
    GoogleMap,
    Marker
  },
    data(){
        return{
            vivienda: null,
            fechaInicio: null,
            fechaFin: null,
            huespedes: null,
            reservas: null,
            disponibles: true,
            pagoPendiente: false,
            loaded: false,
            paidFor: false,
            price: null,
            reservaObjeto: {},
            token: null,
            comentario: "",
            nombreUsuario: ""
        };
    },
    created(){
      this.token = localStorage.getItem('Token');
      if (this.token != null) {
        let nombre = localStorage.getItem('NombreUsuario');
        console.log(nombre)
        let indice = nombre.indexOf("@");
        // Cortar desde 0 hasta la aparición del @
        this.nombreUsuario = nombre.substring(0, indice);
      }
      var parametro = this.$route.params.id;
      axios.get("https://airbnbbackend-1-h8629053.deta.app/appVivienda/vivienda", { params: { id: parametro } }).then(response => this.vivienda = response.data);
      axios.get("https://airbnbbackend-1-h8629053.deta.app/appReserva/reservas/viviendasAsociada/" + parametro).then(res => this.reservas = res.data);

    },
    methods: {
      mapCenter() {
      return {
        lat: parseFloat(this.vivienda.latitud),
        lng: parseFloat(this.vivienda.longitud),
      }
    },
    comentar(){
      var comentarioVivienda = {
        "texto": this.comentario,
        "usuario": this.nombreUsuario
      }
      this.vivienda.comentarios.unshift(comentarioVivienda);

      axios({
        method: 'put',
        url: 'https://airbnbbackend-1-h8629053.deta.app/appVivienda/viviendas/' + this.vivienda._id,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(this.vivienda)
      })

      this.comentario = "";
      alert("Se ha realizado el comentario correctamente");

    },
    comprobarDias(dia) {
      var size = Object.keys(this.reservas).length;
      var cont = 0;
      var disponible = true;
      while (cont < size && disponible) {
        //Comparar el dia concreto de abajo con todo el intervalo de las reservas
        disponible = dia < Date.parse(this.reservas[cont].fechaInicio) || dia > Date.parse(this.reservas[cont].fechaFin);
        cont++;
      }
      return disponible;
    },
    disponibilidad() {
      var cont = this.calcularIntervalo() + 1;
      var disponible = Date.parse(this.fechaFin) > Date.parse(this.fechaInicio);
      var dia = Date.parse(this.fechaInicio);

      while (cont > 0 && disponible) {
        //Dia a dia del intervalo
        disponible = this.comprobarDias(dia);
        cont--;
        dia = dia + (1000 * 60 * 60 * 24); //sumamos un dia 
      }
      return disponible;
    },
    calcularIntervalo() {
      let resta = Date.parse(this.fechaFin) - Date.parse(this.fechaInicio);
      return Math.round(resta / (1000 * 60 * 60 * 24));
    },
    // realizarReserva() {
    //   axios.post("https://airbnbbackend-1-h8629053.deta.app/appReserva/reservas", this.reservaObjeto).then((result) => { console.log(result.data); });
    //   axios.get("https://airbnbbackend-1-h8629053.deta.app/appReserva/reservas/viviendasAsociada/" + this.vivienda._id).then(res => this.reservas = res.data);
    //   alert("Reserva realizada con exito!")

    // },

    funcionPago() {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AWdAd7ohpal0f5MYNjY-kxcgFZxMWaAqH74EfwtUj8uPLG4zwihVwMy-kTQtsiDJHgRa5gvgV5vey8Vx";
      script.addEventListener("load", this.setLoaded);
      document.body.appendChild(script);
    },
    realizarPago() {
      this.funcionPago();
      this.price = this.reservaObjeto.costeTotal;
      this.pagoPendiente = true;
    },
    async sendForm() {

      var objeto = {};

      objeto = {
        "id": this.vivienda._id,
        "direccion": this.vivienda.direccion,
        "localidad": this.vivienda.localidad,
        "provincia": this.vivienda.provincia,
        "foto": this.vivienda.foto
      };

      this.reservaObjeto = {
        "vivienda": objeto,
        "fechaInicio": this.fechaInicio,
        "fechaFin": this.fechaFin,
        "costeTotal": this.vivienda.precio * this.calcularIntervalo(),
        "usernameBuyer": this.nombreUsuario
      }

      if (!this.disponibilidad()) {
        alert('No se puede reservar. Las fechas no son válidas.');
      } else if (this.huespedes > this.vivienda.capacidad) {
        alert('No se puede reservar. Demasiados huéspedes.');
      } else {
        this.realizarPago();  
      }
    },
    setLoaded: function () { //paypal
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: this.price
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            axios.post("https://airbnbbackend-1-h8629053.deta.app/appReserva/reservas", this.reservaObjeto).then((result) => { console.log(result.data); });
            axios.get("https://airbnbbackend-1-h8629053.deta.app/appReserva/reservas/viviendasAsociada/" + this.vivienda._id).then(res => this.reservas = res.data);
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    }
    

    }
}

</script>

<template>

  <div v-if=this.pagoPendiente>
      <div v-if="!paidFor">
        <h1>El coste total de la reserva es - {{ price }}€ </h1>
        <div ref="paypal"></div>
      </div>

      <div v-if="paidFor">
        <h1>Reserva realizada</h1>
        <router-link to="/"> Inicio </router-link>
        <router-link v-if="token" to="/listaReservas"> Ver Reservas </router-link>
      </div>
    </div>

    <div v-else>

        <table class="tabla-Grande" v-if="vivienda">
          <tr>

            <td class="celda-Anuncio"><img :src='vivienda.foto' width="375" /></td>

            <td class="celda-Anuncio">

              <table class="tabla-Info">
                <tr>
                  <td class="bold-text">Direccion:&nbsp;</td>
                  <td>{{ vivienda.direccion }}</td>
                </tr>

                <tr>
                  <td class="bold-text">Localidad:&nbsp;</td>
                  <td>{{ vivienda.localidad }}</td>
                </tr>

                <tr>
                  <td class="bold-text">Provincia:&nbsp;</td>
                  <td>{{ vivienda.provincia }}</td>
                </tr>

                <tr>
                  <td class="bold-text">Características:&nbsp;</td>
                  <td>{{ vivienda.caracteristicas }}</td>
                </tr>

                <tr>
                  <td class="bold-text">Capacidad:&nbsp;</td>
                  <td>{{ vivienda.capacidad }}</td>
                </tr>

                <tr>
                  <td class="bold-text">Precio/día:&nbsp;</td>
                  <td>{{ vivienda.precio }}</td>
                </tr>

                <tr>
                  <td class="bold-text">Vendedor:&nbsp;</td>
                  <td>{{ vivienda.vendedor }}</td>
                </tr>

              </table>

            </td>

            <td class="celda-Anuncio">
            <div class="panel-Reserva">

              <form @submit.prevent="sendForm">

                <div class="div-padding">
                  <label for="diaEntrada" class="text-reserva">Día entrada</label><br />
                  <input type="date" v-model="fechaInicio" required />
                </div>

                <div class="div-padding">
                  <label for="diaSalida" class="text-reserva">Día salida:</label><br />
                  <input type="date" v-model="fechaFin" required />
                </div>

                <div class="div-padding">
                  <label for="huespedes" class="text-reserva">Huéspedes:</label><br />
                  <input type="number" v-model="huespedes" min="1" required class="huespedes-box" />
                </div>

                <div class="div-padding">
                  <label v-if="token == null">Necesitas iniciar sesion</label>
                  <input v-if="token != null" type="submit" class="botonPersonalizado" value="Reservar" />
                </div>
              </form>

            </div>
          </td>


          </tr>
        </table>

        <div class="mapa" v-if="vivienda">
        <GoogleMap api-key="AIzaSyBCYHan3yZnGNFLkFXqa1DvByXXP3Khq40"
          style="width: 400px; height: 400px; align: center; padding-left: 25%; padding-right: 25%;"
          :center="this.mapCenter()" :zoom="16">
          <Marker :options="{ position: this.mapCenter() }" />
        </GoogleMap>
      </div>

      <table class="tabla-Grande">
        <tr>
          <td>
            <div id="comentarios">
              <div>
                <label for="escribirComentario" class="comentario"> Comentarios </label><br />
                <textarea type="text" class="comentarioInput" v-model="comentario"
                  placeholder="Escribe un comentario" id="textAreaComentario"></textarea>
              </div>

              <div id="botonComentario">
                <input v-if="token != null" type="button" class="botonPersonalizadoEnviarComentario" value="Enviar"
                  v-on:click="comentar(comentario)" />
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <table v-for="comentario in vivienda.comentarios" class="tabla-Grande">
              <tr  class="fila-comentario"> 
                <td class="celda-Nombre"> 
                  <div class="recuadro-nombre">
                    {{ comentario.usuario }}
                  </div>
                </td>
                <td class="recuadro-texto"> 
                  <div>
                    {{ comentario.texto }}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    

    </div>
</template>

<style scoped>
@import '../assets/mostrarInformacionStyle.css';
</style>
