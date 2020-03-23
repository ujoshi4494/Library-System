const addMember = async function() {
	const data = document.getElementById("add_member_form").elements;
	let body = {};

	for (let i = 0; i<data.length-1; i++) {
		body[data[i].id] = data[i].value;
	}
	const postBooks = fetch('http://localhost:3004/members',
		{	
			method: 'post',
			body : JSON.stringify(body),
			headers: {
		      	'Content-Type': 'application/json'
	    	}
		}
	).then(response => response.json())
	.then(data => console.log(data));
}