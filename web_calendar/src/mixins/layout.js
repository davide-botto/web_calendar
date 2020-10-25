export const data_layoutProps = {
    data() {
        return {
            //-----------------
            // DIALOG
            //-----------------
            largeDialog: {
                cardMinHeight: 550
            },
            loaderDialog: {
                cardMinHeight: 300
            },
            //--------------
            // FORM FIELDS
            //--------------
            textField: {
                outlined: false,
                dense: false,
                filled: false,
                rounded: false,
                regular: true,
                rounded: false,
                solo: false,
                color: "primary"
            },
            //-----------------
            // BUTTONS
            //-----------------
            standardButtonHeight: 50,
            standardButtonWidth: 150,
            closeButton: {
                color: "error",
                icon: '$vuetify.icons.cancel',
                fab: true,
                outlined: true,
            },
            //-----------
            // LOADER
            //-----------
            loader: {
                size: 110,
                color: "primary"
            }
        }
    }
}