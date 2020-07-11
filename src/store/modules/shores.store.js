import ShoreService from "@/services/ShoreService.js";

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

  fetchShores() {
    return new Promise(resolve => {
      ShoreService.getShores(data => {
        resolve(data);
        //commit("SET_VARIABLE_1", data);
      });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
