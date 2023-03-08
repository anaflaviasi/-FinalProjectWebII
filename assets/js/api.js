function API(baseUrl) {
    this.baseURL = baseUrl;
  }


  API.prototype.callAPI = function (endpoint) {
    return fetch(this.baseURL + endpoint)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };
  