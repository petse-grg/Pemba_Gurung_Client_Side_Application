
document.getElementById("nextButton").addEventListener("click", nextBook);
document.getElementById("previousButton").addEventListener("click", previousBook);


let listOfBook = [];
let currentIndex = 0;
let coverImg;


function searchBook() {
    const title = document.getElementById("titleInput").value;
    if (title.trim() === "") {
        alert("Please enter a book title");
        return;
    }

    fetch(`https://openlibrary.org/search.json?q=${title}`)
        .then(response => response.json())
        .then(data =>
            {
            if (data.length === 0) {
                alert(`No Books found name`);
                return;
            }
            listOfBook = data.docs;
            displayBooks();
        }
        ).catch(error => console.error("Error fetching Data", error));
}

function displayBooks() {
   if(currentIndex < listOfBook.length) {
    const book = listOfBook[currentIndex];

    document.getElementById("bookTitle").textContent = `Title: ${book.title}`;
    document.getElementById("authorName").textContent = `Aurthor: ${book.author_name[0]}`;

    coverImg = book.cover_i;
    fetchCoverImg();

    const nextButton = document.getElementById("nextButton");
    const referenceLink = document.getElementById("link");

    nextButton.style.display = "block";
    referenceLink.style.display = "inline";

   } else {
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("previousButton").style.display = "none";
    document.getElementById("link").style.display = "none";
   }
}

function fetchCoverImg() {
    fetch(`https://covers.openlibrary.org/b/id/${coverImg}-M.jpg`)
        .then(response => response.blob())
        .then(blob =>
            {
            const imageResponse = URL.createObjectURL(blob);
            document.getElementById("bookCover").src = imageResponse;
            const img = document.getElementById("bookCover");
            img.style.display = "block";
        }
        ).catch(error => console.error("Error fetching Data", error));
}

function nextBook() {
    currentIndex++;
    const previousButton = document.getElementById("previousButton");
    previousButton.style.display = "block";
    if (currentIndex < listOfBook.length) {
        displayBooks();
    } else {
        alert("No more book to show");
        document.getElementById("nextButton").disabled = true;
    }
}

function previousBook() {
    if (currentIndex > 0) {
        currentIndex--;
        displayBooks();
    } else {
        document.getElementById("previousButton").style.display = "none";
    }
}
