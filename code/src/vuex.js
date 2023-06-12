import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        dados: {
            destino: null,
            peso: null
        },
        dataApi: [],
        limpar: false
    },
    mutations: {
        setDados(state, dados){
            state.dados = dados;
        },
        setDataApi(state, data){
            state.dataApi = data;
        },
        setLimpar(state, data){
            state.limpar = data;
        }
    },
    getters: {
        getDados: state => state.dados,
        getDataApi: state => state.dataApi,
        getLimpar: state => state.limpar
    },
    actions: {
        setDados({ commit }, data){
            commit('setDados', data);
        },
        setDataApi({ commit}, data){
            commit('setDataApi', data);
        },
        setLimpar({ commit}, data){
            commit('setLimpar', data);
        },

    }
})

export { store }