// Google Books APIs
const key = "AIzaSyDxXcSUwSaX5px-SnsmG6K_LuOMtZKdKUA";


 const model = new Model();


//Social Bar Header
const containerHeader = document.getElementById('container-header');
const headerSocialBar = document.createElement('div');
headerSocialBar.innerHTML = `<div class="Header_social_bar">
                                    <nav class="Nav_social_media_buttons">
                                        <li>
                                            <a class="Social_link" href="https://www.instagram.com" title="Instagram" target="_blank">
                                                <svg class="Icon">
                                                    <path d="M12 16a4 4 0 100-8 4 4 0 000 8z"></path>
                                                    <path d="M3 16V8a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5z"></path>
                                                    <path d="M17.5 6.51l.01-.011"></path>
                                                </svg>
                                            </a> 
                                        </li>           
                                        <li>
                                            <a class="Social_link" href="https://www.facebook.com" title="Facebook" target="_blank">
                                                <svg class="Icon">
                                                    <path d="M17 2h-3a5 5 0 00-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"></path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="Social_link" href="https://www.pinterest.ca" title="Pinterest" target="_blank">
                                                <svg class="Icon">
                                                    <path d="M8 14.5c-3-4.5 1.462-8 4.5-8 3.038 0 5.5 1.654 5.5 5.5 0 3.038-2 5-4 5s-3-2-2.5-5m.5-2L9 21.5"></path>
                                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="Social_link" href="https://www.youtube.com" title="YouTube" target="_blank">
                                                <svg class="Icon">
                                                    <path d="M14 12l-3.5 2v-4l3.5 2z"></path>
                                                    <path d="M2 12.707v-1.415c0-2.895 0-4.343.905-5.274.906-.932 2.332-.972 5.183-1.053C9.438 4.927 10.818 4.9 12 4.9c1.181 0 2.561.027 3.912.065 2.851.081 4.277.121 5.182 1.053.906.931.906 2.38.906 5.274v1.415c0 2.896 0 4.343-.905 5.275-.906.931-2.331.972-5.183 1.052-1.35.039-2.73.066-3.912.066a141.1 141.1 0 01-3.912-.066c-2.851-.08-4.277-.12-5.183-1.052C2 17.05 2 15.602 2 12.708z"></path> -->
                                                </svg>
                                            </a>
                                        </li>
                                    </nav>
                                </div>`;

containerHeader.appendChild(headerSocialBar);

//Social Bar Footer
const containerFooter = document.getElementById('container-footer');
const footerSocialBar = document.createElement('div');
footerSocialBar.innerHTML = headerSocialBar.innerHTML;
containerFooter.appendChild(footerSocialBar);


document.getElementById('enter').onclick = function(){
  // Search Input Box
var searchInput = document.getElementById("searchbar");
var query = searchInput.value;

  getBooks(query);
}


function getBooks(query){

  let api = new API(
    `https://www.googleapis.com/books/v1/volumes?`
  );

  api.callAPI(`q=${query}`).then((response) => {

    model.setData(response.items);
    console.log(response);
    const getData = model.getData();
    displayBooks(getData);

    // displayBooks(response);
  });
}
 

function displayBooks(data) {

  let searchList = document.getElementById('Books_list');
  searchList.innerHTML = "";

  data.forEach((items) => {

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

  containerButton.innerHTML =  `<button id=${items.id} class="btn btn-dark position-absolute favourite">
                                  <i class="glyphicon glyphicon-heart"></i>
                                </button>`
  
  document.querySelectorAll('.favourite').forEach(element => {
    element.addEventListener('click', setFavourite);
  });


  infBookH.append(nameBook); 
  containerImg.append(imgBook);
  infBookF.append(nameAuthor);
  books.append(infBookH, containerImg, infBookF, containerButton);
  searchList.append(books);

});
}

function setFavourite() {

  let data = model.getData();
  let favouritesArray = [];
  
  let fetchDataFromLocalStorage = model.getFavourites();


  let modifiedData = data.map((items) => {
    if (items.id === this.id) {
      items.isFavourite = true;
      favouritesArray.push(items);
    }
    return items;
  });

  if (fetchDataFromLocalStorage) {
    model.setFavourites([...fetchDataFromLocalStorage, ...favouritesArray]);
  } else {
    model.setFavourites(favouritesArray);
  }

  model.setData(modifiedData);

}

var defaultSearch = "Potter";
getBooks(defaultSearch);
