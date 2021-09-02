/* Global variable */
const searchInput = document.getElementById('input-field');
const searchButton = document.getElementById('search-button');
const searchContainer = document.getElementById('search-container');
const errorMassage = document.getElementById('error-massage');

searchButton.addEventListener('click', function () {
    const searchText = searchInput.value;

    if (searchText === "") {
        errorMassage.innerText = `Please Carrect Input Value...!`;
        return;
    }

    // clear field
    searchContainer.textContent = "";

    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => searchBookDetails(data.docs))
    // .finally(() => searchInput.value === "");
});

const searchBookDetails = books => {

    /* error handling */
    if (books.length === 0) {
        errorMassage.innerText = `No book found for "${searchInput.value}" search result !`;
    }
    else {
        errorMassage.innerText = "";
    }

    books.forEach(book => {
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 shadow">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">Book Name: ${book.title}</h2>
                    <p class="card-title">Autor: ${book.author_name}</p>
                    <p class="card-title">Publisher: ${book.publisher}</p>
                    <p class="card-title">First Publish date: ${book.first_publish_year}</p>
                    
                </div>
            </div>
        `;
        searchContainer.appendChild(div)
    })
}