<template>
  <div class="home">
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-select label="Layout" :items="types" v-model="type" return-object></v-select>
      </v-col>
    </v-row>
    <v-calendar
      ref="calendar"
      :now="now"
      :value="today"
      :type="type.value"
      :weekday-format="getDay"
      :weekdays="weekdays"
      color="primary"
    ></v-calendar>
  </div>
</template>

<script>
// @ is an alias to /src
const dayNames = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
export default {
  name: "Home",
  data() {
    return {
      types: [{text: "Giornaliero", value: "day"}, {text: "Settimanale", value: "week"}, {text: "Mensile", value: "month"}],
      type: {text: "Mensile", value: "month"},
      weekdays: [1, 2, 3, 4, 5, 6, 0],
    };
  },
  methods: {
    //-------------------------
    // Formatto numeri 1 -> 01
    //-------------------------
    formatNumber(value) {
      if (value < 10) {
        return "0" + value;
      }
      return "" + value;
    },
    //-----------------------
    // Nome giorno settimana
    //-----------------------
    getDay(date) {
      let index = new Date(date.date).getDay();
      return dayNames[index];
    }
  },
  computed: {
    //----------------------------
    // Data e ora correnti
    //----------------------------
    now() {
      let now = new Date(Date.now());
      let output =
        now.getFullYear() +
        "-" +
        this.formatNumber(now.getMonth() + 1) +
        "-" +
        this.formatNumber(now.getDate()) +
        " " +
        this.formatNumber(now.getHours()) +
        ":" +
        this.formatNumber(now.getMinutes());
      return output;
    },
    //----------------------
    // Data corrente
    //----------------------
    today() {
      let today = this.now.substr(0, 10);
      return today;
    },
  },
};
</script>
