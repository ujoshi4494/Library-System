
const getSearchedMembers = async function(body){
	const searchedMemberData = await fetch('http://localhost:3004/members/search',
		{
			method: 'post',
			body : JSON.stringify(body),
			headers: {
		      	'Content-Type': 'application/json'
    		}
    	}
	);
	const searchedMemberDataJSON = await searchedMemberData.json();
	const searchedMembers = searchedMemberDataJSON.data;
	return searchedMembers; 
}

const bindPaginationData = function() {
	$('.pagingbtn').click(async function () {
		let searchItem;
		const searchBox = document.getElementById('searchBox');
		if (searchBox == null) {
			searchItem = "";
		}
		else{ 
			searchItem = searchBox.value;
		}
		const body = {
			"searchItem" : searchItem,
			"page_no" : this.id
		}

		const searchedMembers = await getSearchedMembers(body);
		displayMember(searchedMembers, this.id);
	});
}

const displayMember = async function(members, pageNo) {
	const table = document.createElement("table");
	table.classList.add("table");

	let tr = table.insertRow(-1);
	const columns = ["name", "team", "department", "contact", "email"];
	const columns_to_display = ["Name", "Team", "Department", "Contact", "Email"]
	
	for (let i = 0; i < columns_to_display.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = columns_to_display[i];
        tr.appendChild(th);
    }

    for (let i = 0; i < members.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < columns.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = members[i][columns[j]];
        }
    }

    let memberContainer = document.getElementById("show_member_data");
    memberContainer.innerHTML = "";
    memberContainer.appendChild(table);
}


const onLoadCall = async function() {
	const body = {searchItem : ""};
	const searchedMembers = await getSearchedMembers(body);
	const allSearchedMembers = searchedMembers[0].totalSearchedMembers;
	displayMember(searchedMembers, 1);
	paginationMember(allSearchedMembers);
}

onLoadCall();