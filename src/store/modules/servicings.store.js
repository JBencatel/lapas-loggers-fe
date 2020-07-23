import ServicingService from "@/services/ServicingService.js";

const initialState = () => ({
  servicings: []
});

const state = initialState();

// Getter functions
const getters = {
  getServicings(state) {
    return state.servicings;
  }
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  SET_SERVICINGS(state, data) {
    state.servicings = data;
  }
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },

  fetchServicings({ commit }) {
    return new Promise(resolve => {
      ServicingService.getServicings(result => {
        commit("SET_SERVICINGS", result);
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  // eslint-disable-next-line no-unused-vars
  fetchServicing({ commit }, id) {
    return new Promise(resolve => {
      ServicingService.getServicingByID(id, result => {
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  addServicing({ dispatch }, data) {
    return new Promise(resolve => {
      ServicingService.createServicing(data, result => {
        dispatch("fetchServicings");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  editServicing({ dispatch }, data) {
    return new Promise(resolve => {
      ServicingService.updateServicing(data, result => {
        dispatch("fetchServicings");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  removeServicing({ dispatch }, servicingID) {
    return new Promise(resolve => {
      ServicingService.deleteServicing(servicingID, result => {
        dispatch("fetchServicings");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
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
