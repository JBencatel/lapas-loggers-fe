import API from "@/services/API";

export default {
  getLoggers(onSuccess, onError) {
    return API()
      .get("/loggers")
      .then(resp => {
        onSuccess(resp.data.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  getLoggerByID(id, onSuccess, onError) {
    return API()
      .get("/loggers/" + id)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  createLogger(data, onSuccess, onError) {
    return API()
      .post("/loggers", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  updateLogger(data, onSuccess, onError) {
    return API()
      .put("/loggers", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  deleteLogger(loggerID, onSuccess, onError) {
    return API()
      .delete("/loggers/" + loggerID)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  }
};
