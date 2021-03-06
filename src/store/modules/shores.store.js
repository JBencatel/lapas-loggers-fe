import ShoreService from "@/services/ShoreService.js";

const initialState = () => ({
  shores: []
});

const state = initialState();

// Getter functions
const getters = {
  getShores(state) {
    return state.shores;
  }
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  SET_SHORES(state, data) {
    state.shores = data;
  }
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },

  fetchShores({ commit }) {
    return new Promise(resolve => {
      ShoreService.getShores(result => {
        commit("SET_SHORES", result);
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  // eslint-disable-next-line no-unused-vars
  fetchShore({ commit }, id) {
    return new Promise(resolve => {
      ShoreService.getShoreByID(id, result => {
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  addShore({ dispatch }, data) {
    return new Promise(resolve => {
      ShoreService.createShore(data, result => {
        dispatch("fetchShores");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  editShore({ dispatch }, data) {
    return new Promise(resolve => {
      ShoreService.updateShore(data, result => {
        dispatch("fetchShores");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  removeShore({ dispatch }, shoreID) {
    return new Promise(resolve => {
      ShoreService.deleteShore(shoreID, result => {
        dispatch("fetchShores");
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
