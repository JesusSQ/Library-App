// Const and variables

let index = 0 // Id asign
const myLibrary = [] // Book storage
let deleteButtons = []
let toggleButtons = []

// Selectors

const dialog = document.querySelector('dialog')
const cont = document.getElementById('container')
const createBook = document.getElementById('addNewBook')
const titleInput = dialog.querySelector('#title')
const authorInput = dialog.querySelector('#author')
const pagesInput = dialog.querySelector('#pages')
const readInput = dialog.querySelector('#read')
const bookForm = dialog.querySelector('form')

// Constructor

function Book(title, author, pages, read) {
    this.id = setId()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        console.log(this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + this.read)
    }
}

function setId() {
    const id = index
    index += 1
    return id
} 

// Add new book to the library

function addBookToLibrary() {
    const title = titleInput.value
    const author = authorInput.value
    const pages = pagesInput.value
    const read = readInput.checked
        ? 'already read'
        : 'not read' 

    const newBook = new Book(title, author, pages, read)

    myLibrary.push(newBook)
    bookForm.reset()

    displayBooks()
}

// Remove a book from the library

function removeBook(id) {
    const position = myLibrary.findIndex(book => book.id == id)
    myLibrary.splice(position, 1)
    displayBooks()
}

// Toggle status of a book

function toggleBook(id) {
    const book = myLibrary.find(book => book.id == id)
    book.read = book.read === 'already read' ? 'not read' : 'already read'
    displayBooks()
}

// Display the existing books in the library

function displayBooks() {
    cont.innerHTML = ''
    for (const book of myLibrary) {
        const e = document.createElement('div')
        e.classList.add('card')
        e.innerHTML = `
            <h3>${book.title}</h3>
            <div class='text'>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p>Status: ${book.read}</p>
            </div>
            <div id='buttonContainer'>
                <button class='delete' id='${book.id}'>Remove</button>
                <button class='toggle' id='${book.id}'>Toggle</button>
            </div>`
        cont.appendChild(e)
        deleteButtons = document.querySelectorAll('.delete')
        toggleButtons = document.querySelectorAll('.toggle')
    }

    // Event listeners (card buttons)

    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            removeBook(button.id)
        })
    })

    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            toggleBook(button.id)
        })
    })
}

// Event listeners

createBook.addEventListener('click', () => {
    dialog.showModal()
})

bookForm.addEventListener('submit', (e) => {
    e.preventDefault() // Avoid problems with form information
    addBookToLibrary()
    dialog.close()
})
