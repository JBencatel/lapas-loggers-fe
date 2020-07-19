import ListsService from "@/services/ListsService.js";

const initialState = () => ({
  optionsLists: {}
});

const state = initialState();

const getters = {
  getListOfOptionsByListName: state => listName => {
    return state.optionsLists[listName];
  }
};

const mutations = {
  SET_OPTIONS_LIST(state, data) {
    state.optionsLists[data.name] = data.items;
  }
};

const actions = {
  fetchOptionsList({ commit }, listName) {
    return new Promise(resolve => {
      ListsService.getList(listName, listItems => {
        commit("SET_OPTIONS_LIST", { name: listName, items: listItems });
        resolve(listItems);
      });
    });
  },

  addOptionsListItem({ dispatch }, data) {
    return new Promise(resolve => {
      let listName = data.listName;
      let itemData = data.itemData;
      ListsService.createListItem(listName, itemData, result => {
        dispatch("fetchOptionsList", listName);
        resolve(result);
      });
    });
  },

  editOptionsListItem({ dispatch }, data) {
    return new Promise(resolve => {
      let listName = data.listName;
      let itemData = data.itemData;
      ListsService.updateListItem(listName, itemData, result => {
        dispatch("fetchOptionsList", listName);

        resolve(result);
      });
    });
  },

  removeOptionsListItem({ dispatch }, data) {
    return new Promise(resolve => {
      let listName = data.listName;
      let itemID = data.itemID;
      ListsService.removeListItem(listName, itemID, result => {
        dispatch("fetchOptionsList", listName);
        resolve(result);
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
