<template>
  <v-dialog
    v-model="dialog.show_dialog_loader"
    :width="dialog.width"
    persistent
  >
    <v-card :min-height="loaderDialog.cardMinHeight">
      <h2 style="text-align: center">Attendi</h2>
      <v-row align="center" justify="center" class="loading_div">
        <v-col align="center" style="height: 100%">
          <v-progress-circular
            :size="loader.size"
            indeterminate
            :color="loader.color"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { EventBus } from "../main";
export default {
  props: {
    dialog: Object,
  },
  mounted() {
    EventBus.$on("wait_start", () => (this.dialog.show_dialog_loader = true));
    EventBus.$on("wait_stop", () => {
      this.dialog.show_dialog_loader = false;
    });
  },
};
</script>
<style scoped>
.loading_div {
  position: absolute !important;
  margin: auto !important;
  top: 50% !important;
  transform: translateY(-50%);
  left: 0 !important;
  width: 100%;
  background: rgba(255, 255, 255, 1);
}

/* .v-dialog {
  position: absolute;
  top: 0;
} */
</style>