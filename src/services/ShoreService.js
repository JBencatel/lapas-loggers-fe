import API from "@/services/API";

export default {
  getShores(onSuccess, onError) {
    return API()
      .get("/shores")
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  storeShore(data, onSuccess, onError) {
    return API()
      .post("/shores", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  updateShore(data, onSuccess, onError) {
    return API()
      .put("/shores", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  deleteShore(shoreID, onSuccess, onError) {
    return API()
      .delete("/shores/" + shoreID)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  }
};
