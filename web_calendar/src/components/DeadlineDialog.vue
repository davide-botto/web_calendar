<template>
  <v-dialog v-model="dialog.show_dialog_editDeadline" :width="dialog.width">
    <v-card :min_height="largeDialog.cardMinHeight">
      <v-card-title>{{ dialogTitle }}</v-card-title>
      <v-card-text>
        <v-form ref="form" id="deadlineForm">
          <v-text-field
            label="Titolo"
            v-model="deadline_data.name"
            :outlined="textField.outlined"
            :dense="textField.dense"
            :filled="textField.filled"
            :regular="textField.regular"
            :rounded="textField.rounded"
            :solo="textField.solo"
            :color="textField.color"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :color="closeButton.color"
          :outlined="closeButton.outlined"
          fab
          class="ml-3 mb-3"
          @click="closeDialog()"
        >
          <v-icon>{{ closeButton.icon }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { EventBus } from "../main";
export default {
  props: {
    dialog: Object,
  },
  data() {
    return {
      deadline_data: {},
      dialogTitle: "",
    };
  },
  mounted() {
    EventBus.$on("deadline_edit", (deadline_id) => {
      if (deadline_id) {
        EventBus.$emit("wait_start");
        this.dialogTitle = "Modifica scadenza";
        this.$store
          .dispatch("deadlines/act_get", deadline_id)
          .then(() => {
            setTimeout(() => {
              EventBus.$emit("wait_stop");
              this.dialog.show_dialog_editDeadline = true;
            }, 800);

            this.deadline_data = Object.assign(
              {},
              this.$store.getters["deadlines/get_selected_deadline"]
            );
            console.log("Dati dialog ", this.deadline_data);
          })
          .catch((err) => {
            EventBus.$emit("wait_stop");
          });
      } else {
        this.dialogTitle = "Nuova scadenza";
      }
    });
  },
  methods: {
    closeDialog() {
      this.dialog.show_dialog_editDeadline = false;
    },
  },
};
</script>