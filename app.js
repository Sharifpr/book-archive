searchResult = () => {

  const inputField = document.getElementById("input-field");
  const cardDetail = document.getElementById("card-details");
  const totalFound = document.getElementById("found");
  const emptyInput = document.getElementById("emptyInput");
  const error = document.getElementById("error");

  const inputValue = inputField.value;
  cardDetail.textContent = "";
  totalFound.innerText = "";

  if (inputValue === "") {

    emptyInput.style.display = "block";
    error.style.display = "none";
    totalFound.innerText = "";
    cardDetail.textContent = "";

  }
  else {

    emptyInput.style.display = "none";

    //  book url
    const url = `https://openlibrary.org/search.json?q=${inputValue}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) =>
        displayBook(data));
  }
  inputField.value = "";
};

displayBook = (books) => {
  const totalFound = document.getElementById("found");
  totalFound.innerText = `The total results: ${books.numFound}`;

  const error = document.getElementById("error");

  if (books.numFound === 0) {
    totalFound.innerText = "";
    error.style.display = "block";

  }
  else {
    error.style.display = "none";

    const cardDetail = document.getElementById("card-details");

    books?.docs.forEach((book) => {
      const div = document.createElement("div");

      //  some condition 
      book?.cover_i ? (imgUrl = `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`) : (imgUrl = "images/error.png");
      book?.author_name ? (author = book?.author_name.join()) : (author = "not available");
      book?.publisher[0] ? (publisher = book?.publisher[0]) : (publisher = "not available");
      book?.publish_date[0] ? (publishDate = book?.publish_date[0]) : (publishDate = "not available");

      div.innerHTML = `
       <div class="col">
           <div class="card vh-100 shadow rounded-2">
                <img height='450px'  src=${imgUrl}  class="card-img-top" alt="...">
               <div class="card-body">
                   <h5 id="author" class="card-title">Book Name: ${book?.title}</h5>
                   <h6 class="card-text">Author:  <span class ="text-secondary"> ${author} </span></h6>
                   <h6 class="card-text">Publisher: <span class ="text-secondary"> ${publisher} </span> </h6>
                   <h6 class="card-text">Published: <span class ="text-secondary">  ${publishDate} </span> </h6>

               </div>
           </div>
       </div>
       `;
      cardDetail.appendChild(div);

    });
  }
};

