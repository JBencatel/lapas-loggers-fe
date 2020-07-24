import API from "@/services/API";

export default {
  getLogs(onSuccess, onError) {
    return API()
      .get("/logs")
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  getLogByID(id, onSuccess, onError) {
    return API()
      .get("/logs/" + id)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  createLog(data, onSuccess, onError) {
    return API()
      .post("/logs", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  updateLog(data, onSuccess, onError) {
    return API()
      .put("/logs", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  deleteLog(logID, onSuccess, onError) {
    return API()
      .delete("/logs/" + logID)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  }
};
