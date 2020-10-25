import Axios from 'axios'
export const deadlines = {
    namespaced: true,
    state: {
        deadlines: [],
        selected_deadline: {}
    },
    getters: {
        get_deadlines(state) {
            return state.deadlines;
        },
        get_selected_deadline(state) {
            return state.selected_deadline;
        }
    },
    mutations: {
        mut_deadlines(state, payload) {
            state.deadlines = payload;
        },
        mut_selected_deadline(state, payload) {
            state.selected_deadline = payload;
        }
    },
    actions: {
        act_get({ commit }, id) {
            console.log("D - CALL act_get deadlines");
            let url = process.env.VUE_APP_DB_BASE + "/" + process.env.VUE_APP_DB_DEADLINES;
            if (id) {
                url = url + "/" + id;
            }
            const options = {
                url,
                headers: {},
                method: "GET"
            }
            console.log("Options ", options);
            return Axios(options)
                .then(response => {
                    if (response.status == 200) {
                        console.log("Resp. deadlines ", response.data);
                        if (id) {
                            commit("mut_selected_deadline", response.data);
                        }
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