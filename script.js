document.getElementById("nextButton").addEventListener("click", nextBook);

let listOfBook = [];
let currentIndex = 0;


function searchBook() {
    const title = document.getElementById("titleInput").value;
    if (title.trim() === "") {
        alert("Please enter a book title");
        return;
    }

    fetch(`https://openlibrary.org/search.json?title=${title}`)
        .then(response => response.json())
        .then(data =>
            {
            if (data.length === 0) {
                alert(`No Books found name`);
                return;
            }
            listOfBook = data.docs;

            console.log(listOfBook);
            displayBooks();
        }
        ).catch(error => console.error("Error fetching Data", error));
}

function displayBooks() {
   if(currentIndex < listOfBook.length) {
    const book = listOfBook[currentIndex];
    document.getElementById("bookTitle").textContent = `Title: ${book.title}`;
    document.getElementById("authorName").textContent = `Aurthor: ${book.author_name[0]}`;
    document.getElementById("nextButton").disabled = false;
    const referenceLink = document.getElementById("link");
    referenceLink.style.display = "inline";
   } else {
    document.getElementById("nextButton").disabled = true;
   }
}


function nextBook() {
    currentIndex++;
    if (currentIndex < listOfBook.length) {
        displayBooks();
    } else {
        alert("No more book to show");
        document.getElementById("nextButton").disabled = true;
    }
}
