import Axios from 'axios'
export const categories = {
    namespaced: true,
    state: {
        categories: []
    },
    getters: {
        get_categories(state) {
            return state.categories;
        }
    },
    mutations: {
        mut_categories(state, payload) {
            state.categories = payload;
        }
    },
    actions: {
        act_get({ commit }) {
            console.log("D - CALL act_get categories");
            const url = process.env.VUE_APP_DB_BASE + "/" + process.env.VUE_APP_DB_CATEGORIES;
            const options = {
                url,
                headers: {},
                method: "GET"
            }
            console.log("Options ", options);
            return Axios(options)
                .then(response => {
                    if (response.status == 200) {
                        console.log("Resp. categories ", response.data);
                        commit("mut_categories", response.data);
                        return;
                    }
                })
                .catch(err => {
                    throw new Error(err.message);
                })
        }
    }
}