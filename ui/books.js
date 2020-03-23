const getSearchedBooks = async function(body) {
	const {searchItem, pageNo} = body;
	const bookData = await fetch('http://localhost:3004/books/search',
		{
			method: 'post',
			body : JSON.stringify(body),
			headers: {
		      	'Content-Type': 'application/json'
    		}
    	}
	);
	const bookDataJSON = await bookData.json();
	const books = bookDataJSON.data;
	return books;
}


const getTotalBooks = async function() {
	const totalBooks = await fetch('http://localhost:3004/books');
	const bookDataJSON = await totalBooks.json();
	const books = bookDataJSON.data;
	return books; 
}

const getNoOfBooks = async function() {
	const totalBooks = await getTotalBooks();
	return totalBooks.length;
}

const displayBook = async function(books, pageNo) {
	console.log(books);
	const table = document.createElement("table");
	table.classList.add("table");

	let tr = table.insertRow(-1);
	const columns = ["name", "author", "copies_available"];
	const columns_to_display = ["Name", "Author", "Copies Available", "Edit", "Delete"];
	
	for (let i = 0; i < columns_to_display.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = columns_to_display[i];
        tr.appendChild(th);
    }

    for (let i = 0; i < books.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < columns_to_display.length; j++) {
            var tabCell = tr.insertCell(-1);
            if (j==columns_to_display.length-1 ) {
            	tabCell.innerHTML = `<button value = delete id = delete class = "page btn btn btn-info">DELETE</button>`;	
            }
            else if (j==columns_to_display.length-2 ){
            	tabCell.innerHTML = `<button value = edit id = edit class = "page btn btn btn-info">EDIT</button>`;	
            }
            else{
            	tabCell.innerHTML = books[i][columns[j]];
            }

        }
    }

    let bookContainer = document.getElementById("show_book_data");
    bookContainer.innerHTML = "";
    bookContainer.appendChild(table);
}

const onLoadCall = async function() {
	const body = {searchItem : ""};
	const searchedBooks = await getSearchedBooks(body);
	const allSearchedBooks = searchedBooks[0].totalSearchedBooks;
	displayBook(searchedBooks, 1);
	paginationBook(allSearchedBooks);
}

onLoadCall();