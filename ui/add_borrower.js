const issueBook = async function() {
	const data = document.getElementById("add_borrower_form").elements;
	let body = {};

	for (let i = 0; i<data.length-1; i++) {
		body[data[i].id] = data[i].value;
	}
	body["status"] = "issue";
	console.log("body",body);
	const postBorrower = fetch('http://localhost:3004/borrowers',
		{	
			method: 'post',
			body : JSON.stringify(body),
			headers: {
		      	'Content-Type': 'application/json'
	    	}
		}
	).then(response => response.json())
	.then(data => data);
	document.getElementById("add_borrower_form").reset();
}