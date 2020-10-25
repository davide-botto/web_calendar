import Axios from 'axios'
export const deadlines = {
    namespaced: true,
    state: {
        deadlines: []
    },
    getters: {
        get_deadlines(state) {
            return state.deadlines;
        }
    },
    mutations: {
        mut_deadlines(state, payload) {
            state.deadlines = payload;
        }
    },
    actions: {
        act_get({ commit }) {
            const url = process.env.VUE_APP_DB_BASE + "/" + process.env.VUE_APP_DB_SCADENZE;
            const options = {
                url,
                headers: {},
                method: "GET"
            }
            return Axios(options)
                .then(response => {
                    if (response.status == 200) {
                        commit("mut_deadlines", response.data);
                        return;
                    }
                })
                .catch(err => {
                    throw new Error(err.message);
                })
        }
    }
}