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
      .post("/shore", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  updateShore(data, onSuccess, onError) {
    return API()
      .put("/shore", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  }
};
