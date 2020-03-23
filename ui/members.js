const getMemberData = async function() {
		const memberData = await fetch('http://localhost:3004/members');
		const memberDataJSON = await memberData.json();
		const members = memberDataJSON.data;
		return members;
	}

	const displayMember = async function() {
		const members = await getMemberData();
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

	displayMember();