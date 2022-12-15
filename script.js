function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read} read yet`;
  };
}

function createBookDisplay(book) {
  const bookCardDiv = document.createElement("div");
  const bookTitleDiv = document.createElement("div");
  const bookAuthorDiv = document.createElement("div");
  const bookPageDiv = document.createElement("div");
  const readStatusDiv = document.createElement("div");
  const removeBtn = document.createElement("button");

  let readStatusButtonClass;
  let readStatusBtnText;
  let readStatusSpanText;

  let title = book.title;
  let author = book.author;
  let pages = book.pages;
  let read = book.read;

  if (read) {
    readStatusSpanText = "Yes";
    readStatusButtonClass = "change-read-status-yes";
    readStatusBtnText = "Not Read";
  } else {
    readStatusSpanText = "No";
    readStatusButtonClass = "change-read-status-not";
    readStatusBtnText = "Read it!";
  }

  bookTitleDiv.innerText = title;
  bookAuthorDiv.innerHTML = `<span class="light-text">by</span> ${author}`;
  bookPageDiv.innerHTML = `<span class="light-text">Pages:</span> ${pages}`;
  readStatusDiv.innerHTML = `<span><span class="light-text">Read:</span> ${readStatusSpanText}</span>
    <button
      type="button"
      id="change-read-status"
      class="${readStatusButtonClass}"
      changeReadStateAttribute
    >
      ${readStatusBtnText}
    </button>`;
  removeBtn.innerText = "Remove Book";

  bookCardDiv.classList.add("book-card");
  bookTitleDiv.classList.add("book-title");
  bookAuthorDiv.classList.add("book-author");
  bookPageDiv.classList.add("book-page");
  readStatusDiv.classList.add("read-status");
  removeBtn.id = "remove-book";
  removeBtn.type = "button";
  removeBtn.setAttribute("removeAttributes", "");

  bookCardDiv.appendChild(bookTitleDiv);
  bookCardDiv.appendChild(bookAuthorDiv);
  bookCardDiv.appendChild(bookPageDiv);
  bookCardDiv.appendChild(readStatusDiv);
  bookCardDiv.appendChild(removeBtn);
  bookContainerElement.appendChild(bookCardDiv);
}

function updateBook() {
  bookContainerElement.innerHTML = "";
  for (const book of library) {
    createBookDisplay(book);
  }
  let readButtons = document.querySelectorAll("[changeReadStateAttribute]");
  readButtons.forEach((button) => {
    button.addEventListener("click", changeReadStatus);
  });
  let removeButtons = document.querySelectorAll("[removeAttributes]");
  removeButtons.forEach((remove) => {
    remove.addEventListener("click", removeCard);
  });
}

function removeCard(event) {
  let parentTitle = event.target.parentNode.children[0].textContent.toString();
  let parentAuthor = event.target.parentNode.children[1].lastChild.textContent
    .toString()
    .trim();
  library.forEach((book) => {
    if (
      book["title"].toString() === parentTitle &&
      book["author"].toString() === parentAuthor
    ) {
      const index = library.indexOf(book);
      if (index > -1) {
        // only splice array when item is found
        library.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  });
  event.target.parentElement.remove();
}

function addBook(event) {
  if (
    bookTitlePopupElement.value === "" ||
    bookAuthorPopupElement.value === "" ||
    bookPagePopupElement.value === ""
  ) {
    return;
  }
  event.preventDefault();
  let book = new Book(
    bookTitlePopupElement.value,
    bookAuthorPopupElement.value,
    bookPagePopupElement.value,
    bookReadPopupElement.checked
  );
  library.push(book);
  updateBook();
  onOfPopupOverlay();
}

function onOfPopupOverlay() {
  formElement.reset();
  popupWindow.classList.toggle("none");
  overlayElement.classList.toggle("none");
}

function changeReadStatus(event) {
  let parentTitle =
    event.target.parentNode.parentNode.children[0].textContent.toString();
  let parentAuthor =
    event.target.parentNode.parentNode.children[1].lastChild.textContent
      .toString()
      .trim();
  if (event.target.classList.toString() === "change-read-status-not") {
    event.target.classList.remove("change-read-status-not");
    event.target.classList.add("change-read-status-yes");
    event.target.innerText = "Not Read";
    event.target.previousElementSibling.lastChild.textContent = " Yes";
    library.forEach((book) => {
      if (
        book["title"].toString() === parentTitle &&
        book["author"].toString() === parentAuthor
      ) {
        book.changeRead(true);
      }
    });
  } else if (event.target.classList.toString() === "change-read-status-yes") {
    event.target.classList.remove("change-read-status-yes");
    event.target.classList.add("change-read-status-not");
    event.target.innerText = "Read it!";
    event.target.previousElementSibling.lastChild.textContent = " No";
    library.forEach((book) => {
      if (
        book["title"].toString() === parentTitle &&
        book["author"].toString() === parentAuthor
      ) {
        book.changeRead(false);
      }
    });
  }
}
// book container
const bookContainerElement = document.getElementById("bookContainer");
const addBookButton = document.getElementById("addBook");
// addBookButton.parentElement.remove()
// popup
const popupWindow = document.querySelector("#add-form-container");
const bookTitlePopupElement = document.querySelector("#titleInput");
const bookAuthorPopupElement = document.querySelector("#authorInput");
const bookPagePopupElement = document.querySelector("#pageInput");
const bookReadPopupElement = document.querySelector("#readCheckBox");
// popupButton
const bookSubmitButton = document.querySelector("#addBookSubmit");
// form reset
const formElement = document.getElementById("addForm");
// overlay
const overlayElement = document.querySelector("#overlay-window");

let library = [];
Book.prototype.changeRead = (isRead) => {
  this.read = isRead;
  return this.read;
};

addBookButton.addEventListener("click", onOfPopupOverlay);
overlayElement.addEventListener("click", onOfPopupOverlay);
bookSubmitButton.addEventListener("click", addBook);
