const modelValue = new Model();
const list = document.getElementById("Books_list_favourites");
const favouritesList = modelValue.getFavourites() || [];
console.log(favouritesList, "Favourites");

if (favouritesList.length === 0) {
  const div = document.createElement("div");
//   div.innerHTML = "<p class='text-center'>There are no favorites yet!</p>";

//   list.appendChild(div);
}

function displayFavourites() {
  // localStorage.clear();
  favouritesList.forEach((items) => {

  var books = document.createElement('div');
  books.className = "Books";

  var infBookH = document.createElement('div');  
  var nameBook = document.createElement('h4');
  nameBook =  items.volumeInfo.title;

  var containerImg = document.createElement('div');

  var imgBook = document.createElement('img');
  imgBook.src = items.volumeInfo.imageLinks.smallThumbnail + 'alt="Lights" style="width:100%"';

  var infBookF = document.createElement('div'); 
  var nameAuthor = document.createElement('p');
  nameAuthor.innerHTML = 'By: ' +  items.volumeInfo.authors[0];

  var containerButton = document.createElement('div');
  containerButton.classList.add("button-positon");

  // var valuess = 123456789;

  containerButton.innerHTML =  `<button id=${items.id} class="btn btn-dark position-absolute favourite">
                                  <i class="glyphicon glyphicon-heart"></i>
                                </button>`

  infBookH.append(nameBook); 
  containerImg.append(imgBook);
  infBookF.append(nameAuthor);
  books.append(infBookH, containerImg, infBookF, containerButton);
  list.append(books);
  });
}

displayFavourites();
