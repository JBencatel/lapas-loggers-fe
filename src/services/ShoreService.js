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
  }
};
