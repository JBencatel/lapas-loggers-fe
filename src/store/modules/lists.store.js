import ListsService from "@/services/ListsService.js";

const initialState = () => ({});

const state = initialState();

const getters = {};

const mutations = {};

const actions = {
  fetchList({commit}, listName) {
    return new Promise(resolve => {
      ListsService.getList(listName, data => {
        resolve(data);
        commit();
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
