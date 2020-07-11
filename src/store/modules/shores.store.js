const initialState = () => ({
  variable1: undefined,
  variable2: undefined,
  variable3: undefined
});

const state = initialState();

// Getter functions
const getters = {
  getVariable1(state) {
    return state.varaible1;
  }
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  SET_VARIABLE_1(state, data) {
    state.varaible1 = data;
  }
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },

  fetchVariable1({ commit }, data) {
    return new Promise((resolve, reject) => {
      // Make network request and fetch data
      // and commit the data
      commit("SET_VARIABLE_1", data);
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
