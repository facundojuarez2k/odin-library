let library = [
    new Book(
        "IT",
        "Stephen King",
        1138,
        1986,
        "Horror",
        "img/stephen_king_it.png",
        "IT is the 22nd book published by Stephen King. It was his 18th novel, and the 13th novel written under his own name. The book was released by Viking on September 15, 1986. It was one of the best selling novels in the United States of that year and is now considered a \"modern masterpiece\" of the horror genre in literature."
    ),
    new Book(
        "1984",
        "George Orwell",
        328,
        1949,
        "Science Fiction",
        "img/george_orwell_1984.png",
        "Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes. But as he starts to think for himself, Winston can’t escape the fact that Big Brother is always watching..."
    
    ),
    new Book(
        "Fahrenheit 451",
        "Ray Bradbury",
        249,
        1953,
        "Science Fiction",
        "img/ray_bradbury_fahrenheit_451.png",
        "Guy Montag is a fireman. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden. Montag never questions the destruction and ruin his actions produce, returning each day to his bland life and wife, Mildred, who spends all day with her television “family.” But when he meets an eccentric young neighbor, Clarisse, who introduces him to a past where people didn’t live in fear and to a present where one sees the world through the ideas in books instead of the mindless chatter of television, Montag begins to question everything he has ever known."
    ),
    new Book(
        "The Road",
        "Cormac McCarthy",
        287,
        2006,
        "Novel",
        "img/cormac_mccarthy_the_road.png",
        "A father and his son walk alone through burned America. Nothing moves in the ravaged landscape save the ash on the wind. It is cold enough to crack stones, and when the snow falls it is gray. The sky is dark. Their destination is the coast, although they don't know what, if anything, awaits them there. They have nothing; just a pistol to defend themselves against the lawless bands that stalk the road, the clothes they are wearing, a cart of scavenged food—and each other."
    )
];

/* Functions */

function Book(author, title, pages, year, genre, pictureUrl, description) {
    this.uuid = generateUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.year = year;
    this.genre = genre;
    this.pictureUrl = pictureUrl;
    this.description = description;
    this.read = false;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(book) {
    library.push(book);
}

function deleteBookFromLibrary(instance) {
    const index = library.findIndex(book => book === instance);
    if(index >= 0) {
        library.splice(index, 1);
    }
}

/* Handle document elements */

const booksContainer = document.querySelector("#booksContainer");

if(booksContainer) {
    library.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        
        // Book top div
        const bookTop = document.createElement("div");
        bookTop.classList.add("book-top");

        const bookCover = document.createElement("img");
        bookCover.classList.add("book-cover");
        bookCover.setAttribute("src", book.pictureUrl);
        bookTop.appendChild(bookCover);

        const bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        bookTop.appendChild(bookInfo);

        const bookTitle = document.createElement("div");
        bookTitle.innerHTML = `Title: <span class='book-info-title'>${book.title || ""}</span>`;
        bookInfo.appendChild(bookTitle);

        const bookAuthor = document.createElement("div");
        bookAuthor.innerHTML = `Author: <span class='book-info-author'>${book.author || ""}</span>`;
        bookInfo.appendChild(bookAuthor);

        const bookPages = document.createElement("div");
        bookPages.innerHTML = `Pages: <span class='book-info-pages'>${book.pages || ""}</span>`;
        bookInfo.appendChild(bookPages);

        const bookYear = document.createElement("div");
        bookYear.innerHTML = `Year: <span class='book-info-year'>${book.year || ""}</span>`;
        bookInfo.appendChild(bookYear);

        const bookGenre = document.createElement("div");
        bookGenre.innerHTML = `Genre: <span class='book-info-genre'>${book.genre || ""}</span>`;
        bookInfo.appendChild(bookGenre);

        // Book bottom div
        const bookBottom = document.createElement("div");
        bookBottom.classList.add("book-bottom");

        const bookDescription = document.createElement("div");
        bookDescription.classList.add("book-description");
        bookDescription.innerText = book.description || "";
        bookBottom.appendChild(bookDescription);

        const readButton = document.createElement("button");
        readButton.innerText = book.read === true ? "Mark as unread" : "Mark as read";
        readButton.classList.add("button");
        readButton.classList.add(book.read === true ? "button-yellow" : "button-green");
        readButton.addEventListener("click", function(event) {
            const button = event.target;
            book.toggleRead(true);
            
            if(book.read == true) {
                readButton.innerText = "Mark as unread";
                readButton.classList.remove("button-green");
                readButton.classList.add("button-yellow");
            } else {
                readButton.innerText = "Mark as read";
                readButton.classList.remove("button-yellow");
                readButton.classList.add("button-green");
            }
        });

        const deleteBook = document.createElement("button");
        deleteBook.innerText = "Remove";
        deleteBook.classList.add("button", "button-red");
        deleteBook.addEventListener("click", function() {
            if(window.confirm("Are you sure you want to proceed?")) {
                deleteBookFromLibrary(book);
                booksContainer.removeChild(bookDiv);
            }
        });
        
        const bookButtons = document.createElement("div");
        bookButtons.classList.add("buttons-container");
        bookButtons.appendChild(readButton);
        bookButtons.appendChild(deleteBook);

        bookBottom.appendChild(bookButtons);

        bookDiv.appendChild(bookTop);
        bookDiv.appendChild(bookBottom);

        booksContainer.appendChild(bookDiv);
    })    
}