import LoggerService from "@/services/LoggerService.js";

const initialState = () => ({
  loggers: []
});

const state = initialState();

// Getter functions
const getters = {
  getLoggers(state) {
    return state.loggers;
  }
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  SET_LOGGERS(state, data) {
    state.loggers = data;
  }
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },

  fetchLoggers({ commit }) {
    return new Promise(resolve => {
      LoggerService.getLoggers(result => {
        commit("SET_LOGGERS", result);
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  // eslint-disable-next-line no-unused-vars
  fetchLogger({ commit }, id) {
    return new Promise(resolve => {
      LoggerService.getLoggerByID(id, result => {
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  addLogger({ dispatch }, data) {
    return new Promise(resolve => {
      LoggerService.createLogger(data, result => {
        dispatch("fetchLoggers");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  editLogger({ dispatch }, data) {
    return new Promise(resolve => {
      LoggerService.updateLogger(data, result => {
        dispatch("fetchLoggers");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  removeLogger({ dispatch }, loggerID) {
    return new Promise(resolve => {
      LoggerService.deleteLogger(loggerID, result => {
        dispatch("fetchLoggers");
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
