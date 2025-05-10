// Const and variables

let index = 0 // Id asign
const bookArray = [] // Book storage

// Selectors

const dialog = document.querySelector('dialog')
const cont = document.getElementById('container')
const createBook = document.getElementById('addNewBook')
const titleInput = dialog.querySelector('#title')
const authorInput = dialog.querySelector('#author')
const pagesInput = dialog.querySelector('#pages')
const readInput = dialog.querySelector('#read')
const bookForm = dialog.querySelector('form')

// Book class

class Book {
    constructor(title, author, pages, read) {
        this.id = this.setId()
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }

    setId() {
        const id = index
        index += 1
        return id
    } 
}

// Library class

class Library {
    constructor (books){
        this.books = books
    }

    addBookToLibrary() {
        const title = titleInput.value
        const author = authorInput.value
        const pages = pagesInput.value
        const read = readInput.checked
            ? 'already read'
            : 'not read' 
    
        const newBook = new Book(title, author, pages, read)
    
        this.books.push(newBook)
        bookForm.reset()
    
        this.displayBooks()
    }

    removeBook(id) {
        const position = this.books.findIndex(book => book.id == id)
        this.books.splice(position, 1)
        this.displayBooks()
    }

    toggleBook(id) {
        const book = this.books.find(book => book.id == id)
        book.read = book.read === 'already read' ? 'not read' : 'already read'
        this.displayBooks()
    }

    displayBooks() {
        cont.innerHTML = ''
        for (const book of this.books) {
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
        }

        let deleteButtons = document.querySelectorAll('.delete')
        let toggleButtons = document.querySelectorAll('.toggle')
        
        deleteButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                myLibrary.removeBook(button.id)
            })
        })
        
        toggleButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                myLibrary.toggleBook(button.id)
            })
        })

    }
}

const myLibrary = new Library(bookArray)

// Validations

const title = document.querySelector('#title')
const author = document.querySelector('#author')
const pages = document.querySelector('#pages')

const setValidity = function(input, message) {
    input.addEventListener('invalid', function() {
        input.setCustomValidity('')
        if (!input.validity.valid) {
            input.setCustomValidity(message) // Set error message
        }
    })

    input.addEventListener('input', function() {
        input.setCustomValidity('') // Clean errors
    })
}

setValidity(title, 'Please enter a title.')
setValidity(author, 'Please enter an author.')
setValidity(pages, 'Please enter the number of pages.')

// Event listeners

createBook.addEventListener('click', () => {
    dialog.showModal()
})

bookForm.addEventListener('submit', (e) => {
    e.preventDefault() // Avoid problems with form information
    myLibrary.addBookToLibrary()
    dialog.close()
})
