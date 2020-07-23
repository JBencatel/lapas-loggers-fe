import API from "@/services/API";

export default {
  getServicings(onSuccess, onError) {
    return API()
      .get("/servicings")
      .then(resp => {
        onSuccess(resp.data.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  getServicingByID(id, onSuccess, onError) {
    return API()
      .get("/servicings/" + id)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  createServicing(data, onSuccess, onError) {
    return API()
      .post("/servicings", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  updateServicing(data, onSuccess, onError) {
    return API()
      .put("/servicings", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  deleteServicing(servicingID, onSuccess, onError) {
    return API()
      .delete("/servicings/" + servicingID)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  }
};
