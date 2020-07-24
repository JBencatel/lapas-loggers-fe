import LogService from "@/services/LogService.js";

const initialState = () => ({
  logs: []
});

const state = initialState();

// Getter functions
const getters = {
  getLogs(state) {
    return state.logs;
  }
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  SET_LOGS(state, data) {
    state.logs = data;
  }
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },

  fetchLogs({ commit }) {
    return new Promise(resolve => {
      LogService.getLogs(result => {
        commit("SET_LOGS", result);
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  // eslint-disable-next-line no-unused-vars
  fetchLog({ commit }, id) {
    return new Promise(resolve => {
      LogService.getLogByID(id, result => {
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  addLog({ dispatch }, data) {
    return new Promise(resolve => {
      LogService.createLog(data, result => {
        dispatch("fetchLogs");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  editLog({ dispatch }, data) {
    return new Promise(resolve => {
      LogService.updateLog(data, result => {
        dispatch("fetchLogs");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  removeLog({ dispatch }, logID) {
    return new Promise(resolve => {
      LogService.deleteLog(logID, result => {
        dispatch("fetchLogs");
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
