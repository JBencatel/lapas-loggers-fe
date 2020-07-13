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
  }
};
