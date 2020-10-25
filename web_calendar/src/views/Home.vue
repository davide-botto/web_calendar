<template>
  <div class="home" style="height: 100%; width: 100%">
    <v-row style="height: 10%">
      <v-col cols="3">
        <v-btn icon @click="previous()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span>{{ timespan }}</span>
        <v-btn icon @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-select
          label="Layout"
          :items="types"
          v-model="type"
          return-object
        ></v-select>
      </v-col>
    </v-row>
    <v-row style="height: 90%">
      <v-col style="height: 100%">
        <div style="height: 680px">
          <v-calendar
            ref="calendar"
            v-model="value"
            :now="now"
            :type="type.value"
            :weekday-format="getDayName"
            :weekdays="weekdays"
            :events="events"
            :event-color="getEventColor"
            @click:event="editDeadline"
            color="primary"
          ></v-calendar>
        </div>
      </v-col>
    </v-row>
    <DeadlineDialog :dialog="dialog"/>
  </div>
</template>

<script>
import { EventBus } from '../main';
import DeadlineDialog from "../components/DeadlineDialog";
// @ is an alias to /src
const dayNames = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
const monthNames = [
  "Gen",
  "Feb",
  "Mar",
  "Apr",
  "Mag",
  "Giu",
  "Lug",
  "Ago",
  "Set",
  "Ott",
  "Nov",
  "Dic",
];
export default {
  name: "Home",
  data() {
    return {
      types: [
        { text: "Giornaliero", value: "day" },
        { text: "Settimanale", value: "week" },
        { text: "Mensile", value: "month" },
      ],
      type: { text: "Settimanale", value: "week" },
      weekdays: [1, 2, 3, 4, 5, 6, 0],
      value: "",
      events: [],
      dialog: {
        width: 600,
        show_dialog_editDeadline: false
      }
    };
  },
  mounted() {
    this.$store
      .dispatch("deadlines/act_get")
      .then(() => {
        return this.$store.dispatch("categories/act_get");
      })
      .then(() => {
        this.value = this.today;
        this.events = this.$store.getters["deadlines/get_deadlines"];
      })
      .catch((err) => {
        console.error(err.name, err.message);
      });
  },
  methods: {
    previous() {
      console.log(this.$refs.calendar);
      console.log(this.value);
      this.$refs.calendar.prev();
    },
    //-------------------------
    // Formatto numeri 1 -> 01
    //-------------------------
    formatNumber(value) {
      if (value < 10) {
        return "0" + value;
      }
      return "" + value;
    },
    getEventColor(event) {
      console.log(this.deadline_categories);
      console.log("Event ", event);
      let category = this.deadline_categories.find(
        (el) => el.id == event.category
      );
      console.log("color ", category.color);
      return category.color;
    },
    ////////////////////////
    // DETTAGLI SCADENZA
    ////////////////////////
    editDeadline({nativeEvent, event}) {
      console.log("Native event ", nativeEvent);
      console.log("Event ", event);
      EventBus.$emit("deadline_edit", event.id);
    },
    //-----------------------
    // Nome giorno settimana
    //-----------------------
    getDayName(date) {
      let index = new Date(date.date).getDay();
      return dayNames[index];
    },
    getMonthName(index) {
      return monthNames[index];
    },
    weekStartEnd(date) {
      let weekString;
      let dateStart = new Date(date.getTime());
      let dateEnd = null;
      let weekday = date.getDay();

      if (weekday == 0) {
        weekday = 7;
      }
      //----------------
      // Start
      //----------------
      dateStart.setDate(dateStart.getDate() - weekday + 1);
      //---------------
      // End
      //---------------
      dateEnd = new Date(dateStart.getTime());
      dateEnd.setDate(dateStart.getDate() + 6);
      //----------------------
      // Compute output string
      //----------------------
      if (dateStart.getFullYear() == dateEnd.getFullYear()) {
        if (dateStart.getMonth() == dateEnd.getMonth()) {
          weekString = dateStart.getDate() + " - " + dateEnd.getDate();
          weekString +=
            " " +
            this.getMonthName(dateEnd.getMonth()) +
            " " +
            dateEnd.getFullYear();
        } else {
          weekString =
            dateStart.getDate() + " " + this.getMonthName(dateStart.getMonth());
          weekString += " - ";
          weekString +=
            dateEnd.getDate() +
            " " +
            this.getMonthName(dateEnd.getMonth()) +
            " " +
            dateEnd.getFullYear();
        }
      } else {
        weekString =
          dateStart.getDate() +
          " " +
          this.getMonthName(dateStart.getMonth()) +
          " " +
          dateStart.getFullYear();
        weekString += " - ";
        weekString +=
          dateEnd.getDate() +
          " " +
          this.getMonthName(dateEnd.getMonth()) +
          " " +
          dateEnd.getFullYear();
      }

      return weekString;
    },
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
    timespan() {
      if (this.value == "") {
        return;
      }

      let date = new Date(this.value);
      let timespanString;
      let start, end;
      switch (this.type.value) {
        case "month":
          timespanString =
            this.getMonthName(date.getMonth()) + " " + date.getFullYear();
          break;
        case "week":
          timespanString = this.weekStartEnd(date);
          break;
        case "day":
          timespanString =
            date.getDate() +
            " " +
            this.getMonthName(date.getMonth()) +
            " " +
            date.getFullYear();
      }
      return timespanString;
    },
  },
  components: {
    DeadlineDialog
  }
};
</script>
