searchResult = () => {
  const inputField = document.getElementById("input-field");
  const cardDetail = document.getElementById("card-details");
  const totalFound = document.getElementById("found");
  const emptyInput = document.getElementById("emptyInput");
  const error = document.getElementById("error");

  const inputValue = inputField.value;
  cardDetail.textContent = "";
  totalFound.innerText = "";

  /*  clear & set field */
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

/* display book details & show results */
displayBook = (books) => {
  const totalFound = document.getElementById("found");
  totalFound.innerText = `The total results: ${books.numFound}`;

  // error handling
  const error = document.getElementById("error");

  if (books.numFound === 0) {
    totalFound.innerText = "";
    error.style.display = "block";

  }
  else {
    error.style.display = "none";

    const cardDetail = document.getElementById("card-details");

    const matchBook = books.docs.filter(item => item.cover_i !== undefined && item.publisher !== undefined && item.publisher[0] !== undefined && item.first_publish_year !== undefined);

    matchBook.forEach((book) => {
      const div = document.createElement("div");

      div.innerHTML = `
       <div class="col">
                <div class="card vh-100 shadow rounded-2">
           <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="rounded-bottom">
               <div class="card-body">
                   <h3 id="author" class="card-title">Book Name: ${book?.title}</h3>
                   <h6 class="card-text">Author:  <span class ="text-secondary"> ${book.author_name} </span></h6>
                   <h6 class="card-text">Publisher: <span class ="text-secondary"> ${book.publisher[0]} </span> </h6>
                   <h6 class="card-text">Published: <span class ="text-secondary">  ${book.first_publish_year} </span> </h6>
               </div>
           </div>
       </div>
       `;
      cardDetail.appendChild(div);

    });
  }
};

