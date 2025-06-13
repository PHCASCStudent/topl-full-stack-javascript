// Book array
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Add book to library
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

// Display books
function displayBooks() {
  const booksDisplay = document.getElementById("booksDisplay");
  booksDisplay.innerHTML = "";
  myLibrary.forEach((book) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card h-100" data-id="${book.id}">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
          <p class="card-text">${book.pages} pages</p>
          <p class="card-text"><span class="badge ${
            book.read ? "bg-success" : "bg-secondary"
          }">${book.read ? "Read" : "Not read"}</span></p>
          <button class="btn btn-sm btn-outline-primary toggle-read">Toggle Read</button>
          <button class="btn btn-sm btn-outline-danger remove-book ms-2">Remove</button>
        </div>
      </div>
    `;
    booksDisplay.appendChild(col);
  });
}

// Event listeners
const newBookBtn = document.getElementById("newBookBtn");
const bookModal = new bootstrap.Modal(document.getElementById("bookModal"));
const bookForm = document.getElementById("bookForm");

newBookBtn.addEventListener("click", () => {
  bookForm.reset();
  bookModal.show();
});

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = parseInt(document.getElementById("pages").value, 10);
  const read = document.getElementById("read").checked;
  addBookToLibrary(title, author, pages, read);
  bookModal.hide();
});

// Delegate remove and toggle read buttons
booksDisplay.addEventListener("click", function (e) {
  const card = e.target.closest(".card");
  if (!card) return;
  const id = card.getAttribute("data-id");
  const book = myLibrary.find((b) => b.id === id);
  if (e.target.classList.contains("remove-book")) {
    const idx = myLibrary.findIndex((b) => b.id === id);
    if (idx > -1) myLibrary.splice(idx, 1);
    displayBooks();
  } else if (e.target.classList.contains("toggle-read")) {
    book.toggleRead();
    displayBooks();
  }
});

// Add some sample books for demo
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);
