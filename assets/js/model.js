function  Model() {

 }
 
 Model.prototype.setData = function(incomingData) {
    const dataWithFavourites = incomingData.map((data) => {
        data.isFavourite = false;
        var storedName = localStorage.getItem('name');
        data.user = storedName;
        return data;
    })
    console.log(dataWithFavourites, "data");
    this.data = dataWithFavourites;
}
 
 Model.prototype.getData = function() {
     return this.data;
 }
 
 Model.prototype.setFavourites = function(array) {
     localStorage.setItem('favourites', JSON.stringify(array));
 }
 
 Model.prototype.getFavourites = function() {
      let dataFavourite = JSON.parse(localStorage.getItem('favourites'));
      return dataFavourite;
 }

 Model.prototype.setAccount = function(array) {
     localStorage.setUser('users', JSON.stringify(array));
 }
 
 Model.prototype.getAccount = function() {
      let dataAccount = JSON.parse(localStorage.getUser('users'));
      return dataAccount;
 }