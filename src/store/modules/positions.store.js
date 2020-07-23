import PositionService from "@/services/PositionService.js";

const initialState = () => ({
  positions: []
});

const state = initialState();

// Getter functions
const getters = {
  getPositions(state) {
    return state.positions;
  }
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  SET_POSITIONS(state, data) {
    state.positions = data;
  }
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },

  fetchPositions({ commit }) {
    return new Promise(resolve => {
      PositionService.getPositions(result => {
        commit("SET_POSITIONS", result);
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  // eslint-disable-next-line no-unused-vars
  fetchPosition({ commit }, id) {
    return new Promise(resolve => {
      PositionService.getPositionByID(id, result => {
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  addPosition({ dispatch }, data) {
    return new Promise(resolve => {
      PositionService.createPosition(data, result => {
        dispatch("fetchPositions");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  editPosition({ dispatch }, data) {
    return new Promise(resolve => {
      PositionService.updatePosition(data, result => {
        dispatch("fetchPositions");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  removePosition({ dispatch }, positionID) {
    return new Promise(resolve => {
      PositionService.deletePosition(positionID, result => {
        dispatch("fetchPositions");
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
