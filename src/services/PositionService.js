import API from "@/services/API";

export default {
  getPositions(onSuccess, onError) {
    return API()
      .get("/positions")
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  getPositionByID(id, onSuccess, onError) {
    return API()
      .get("/positions/" + id)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  createPosition(data, onSuccess, onError) {
    return API()
      .post("/positions", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  updatePosition(data, onSuccess, onError) {
    return API()
      .put("/positions", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  deletePosition(positionID, onSuccess, onError) {
    return API()
      .delete("/positions/" + positionID)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  }
};
