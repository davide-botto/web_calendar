export const app_computed_props = {
    computed: {
        deadline_categories() {
            return this.$store.getters["categories/get_categories"];
        }
    }
}