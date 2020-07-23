import API from "@/services/API";

export default {
  getPeople(onSuccess, onError) {
    return API()
      .get("/people")
      .then(resp => {
        onSuccess(resp.data.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  getPersonByID(id, onSuccess, onError) {
    return API()
      .get("/people/" + id)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  createPerson(data, onSuccess, onError) {
    return API()
      .post("/people", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  updatePerson(data, onSuccess, onError) {
    return API()
      .put("/people", data)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  },

  deletePerson(personID, onSuccess, onError) {
    return API()
      .delete("/people/" + personID)
      .then(resp => {
        onSuccess(resp.data);
      })
      .catch(error => {
        onError(error);
      });
  }
};
