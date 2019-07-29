export const state = () => ({
    sample: false
})

/* eslint-disable no-shadow */
export const mutations = {
    sample(state, payload) {
        state.sample = payload
    }
}

export const actions = {
    async nuxtServerInit({ commit }, { app, req }) {
        commit('sample', true)
    }
}
