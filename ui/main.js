console.log("Script Loaded")

function getTextFromDOMNode(id) {
	var node = document.getElementById(id)
	return node && node.value
}

async function send() {
	const name = getTextFromDOMNode("name");
	const team = getTextFromDOMNode("team");
	const department = getTextFromDOMNode("department");
	const contact = getTextFromDOMNode("contact");
	const email = getTextFromDOMNode("email");
	
	const body = JSON.stringify({
		name,
		team,
		department,
		contact,
		email
	});

	await fetch("http://localhost:3004/members", {
		method: "POST",
		mode: "cors",
		body 
	})

	return false;
}