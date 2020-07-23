import PersonService from "@/services/PersonService.js";

const initialState = () => ({
  people: []
});

const state = initialState();

// Getter functions
const getters = {
  getPeople(state) {
    return state.people;
  }
};

const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  SET_PEOPLE(state, data) {
    state.people = data;
  }
};

const actions = {
  reset({ commit }) {
    commit("RESET");
  },

  fetchPeople({ commit }) {
    return new Promise(resolve => {
      PersonService.getPeople(result => {
        commit("SET_PEOPLE", result);
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  // eslint-disable-next-line no-unused-vars
  fetchPerson({ commit }, id) {
    return new Promise(resolve => {
      PersonService.getPersonByID(id, result => {
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  addPerson({ dispatch }, data) {
    return new Promise(resolve => {
      PersonService.createPerson(data, result => {
        dispatch("fetchPeople");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  editPerson({ dispatch }, data) {
    return new Promise(resolve => {
      PersonService.updatePerson(data, result => {
        dispatch("fetchPeople");
        resolve(result);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    });
  },

  removePerson({ dispatch }, personID) {
    return new Promise(resolve => {
      PersonService.deletePerson(personID, result => {
        dispatch("fetchPeople");
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
