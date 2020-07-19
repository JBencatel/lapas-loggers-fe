import API from "@/services/API";

export default {
  getList(listName, onSuccess, onError) {
    return API()
      .get("/" + listName)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  createListItem(listName, itemData, onSuccess, onError) {
    return API()
      .post("/" + listName, itemData)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  updateListItem(listName, itemData, onSuccess, onError) {
    return API()
      .put("/" + listName, itemData)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  removeListItem(listName, itemID, onSuccess, onError) {
    return API()
      .delete("/" + listName + "/" + itemID)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  }
};
