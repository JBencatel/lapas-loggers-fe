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

  editLog(data, onSuccess, onError) {
    return API()
      .post("/logs", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
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
  },

  downloadLogFile(logID, onSuccess, onError) {
    return API()
      .get("/logs/" + logID + "/file")
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  }
};
