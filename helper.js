const mysqlconnection = require('./connection.js');
getMemberData = function(callback){
	mysqlconnection.query(`select * from member`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})	
}

getBookData = function(callback){
	mysqlconnection.query(`select * from book`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})	
}

getBorrowerData = function(callback){
	mysqlconnection.query(`select * from borrower_detail`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})	
}

postMemberData = function(body,callback){
	const {id,name,team,department,contact,email} = body;
	mysqlconnection.query(`insert into member (id,name,team,department,contact,email) values (${parseInt(id)},"${name}","${team}","${department}","${contact}","${email}")`,
		(err,records)=>{
			if (!err){
				return callback(null,records);
			}
			return callback(err,null);
		});
}

postBookData =  function(body,callback){
	const {id, name, no_of_copies, author, category, copies_available, tag_id, tags } = body;
	console.log("body",body);
	mysqlconnection.query(`insert into book (id,name,no_of_copies,author,category,copies_available) values (${parseInt(id)},"${name}",${parseInt(no_of_copies)},"${author}","${category}",${parseInt(copies_available)})`,
		(err,records)=>{
			if (!err){
				callback(null,records);
			}
			else{
				callback(err,null);
			}
		});
		
	let currentTagId = tag_id;
	tags.split(",").forEach((tag) => {
		console.log(`insert into tag (id, name, book_id) values (${parseInt(currentTagId)}, "${tag.trim()}", ${parseInt(id)})`);
		mysqlconnection.query(`insert into tag (id, name, book_id) values (${parseInt(currentTagId)}, "${tag.trim()}", ${parseInt(id)})`,(err,records)=>{
			if (!err){
				callback(null,records);
			}
			callback(err,null);
		})
		currentTagId++;
	})
	return ""
	
}

getMember = function (id, callback){
	mysqlconnection.query(`select * from member where id = ${parseInt(id)}`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})
}

getBorrower = function (id,callback){
	mysqlconnection.query(`select * from borrower_detail where id = ${parseInt(id)}`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})
}

getBook = function (id, callback){
	mysqlconnection.query(`select * from book where id = ${parseInt(id)}`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})
}


updateMember = function (id, body, callback){
	const {name,team,department,contact,email} = body;
	mysqlconnection.query(`update member set name = "${name}", team = "${team}", department = "${department}",
	contact = "${contact}", email = "${email}" where id = ${parseInt(id)}`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})	
}

updateBook = function (id, body, callback){
	const {name,no_of_copies,author,category,copies_available} = body;
	mysqlconnection.query(`update book set name = "${name}", no_of_copies = "${parseInt(no_of_copies)}", author = "${author}", category = "${category}", copies_available = "${parseInt(copies_available)}" where id = ${parseInt(id)}`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})
}

deleteMember = function(id,callback){
	mysqlconnection.query(`delete from member where id = ${parseInt(id)}`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})
}

deleteBook = function(id,callback){
	mysqlconnection.query(`delete from book where id = ${parseInt(id)}`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})
}

postBorrowerData = function(body,callback){
	let {id,issued_from,issued_to,issued_by,member_id,book_id,status} = body;
	console.log(body);
	mysqlconnection.query(`insert into borrower_detail (id,issued_from,issued_to,issued_by,member_id,book_id,status) values (${parseInt(id)},${STR_TO_DATE(issued_from, '%d-%M-%Y')},"${STR_TO_DATE(issued_to, '%d-%M-%Y')}","${parseInt(issued_by)}","${parseInt(member_id)}",${parseInt(book_id)}),"${status}"`,(err,records,fields)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})
}

searchByBNT = function(searchElement, pageNo, limitPerPage, callback) {
	console.log(searchElement, pageNo, limitPerPage);
	
	const query = `select distinct(b.name), b.author from book b inner join tag t on t.book_id = b.id
	where b.name like "%${searchElement}%" or 
	b.author like "%${searchElement}%" or
	t.name like "%${searchElement}%" limit ${(parseInt(pageNo)-1)*limitPerPage}, ${limitPerPage}` ; 

	mysqlconnection.query(query,(err,records) => {
		if (!err) {
			return callback(null, records);
		}
		return callback(err,null);
	})
}

getTag = function (id, callback){
	mysqlconnection.query(`select * from tag where id = ${id}`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})
}

getTagData = function(callback) {
	mysqlconnection.query(`select * from tag`,(err,records)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})
}

deleteTag = function(id, callback){
	mysqlconnection.query(`delete from tag where id = ${id}`,(err, records) => {
		if (!err) {
			console.log(records);
			return callback(null, `Tag ID ${id} has been successfully deleted!`);
		}
		return callback(err, null);
	})
}


module.exports = {getMemberData, getBookData, getBorrower, getBorrowerData, postMemberData, postBookData, postBorrowerData, getMember, getBook,updateBook, updateMember, deleteBook, deleteMember, searchByBNT, getTagData, getTag, deleteTag}