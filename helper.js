const mysqlconnection = require('./connection.js');
const {isEmpty} = require('lodash');

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

getBooksOfPage = function(pageNo, limitPerPage, callback) {
	if (limitPerPage === undefined) {
		limitPerPage = 4;
	}
	mysqlconnection.query(`select * from books limit ${(parseInt(pageNo)-1)*limitPerPage}, ${limitPerPage}`, (err, data) => {
		if (!err) {
			return callback(null, data);
		}
		return callback(err);
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
	const {name, team, department, contact, email} = body;
	mysqlconnection.query(`insert into member (name,team,department,contact,email) values ("${name}","${team}","${department}","${contact}","${email}")`,
		(err,records)=>{
			if (!err){
				return callback(null,"data successfully submitted");
			}
			return callback(err);
		});
}

postBookData = async function(body,callback){

	const {name, author, copies_available, tags} = body;
	const queryData = new Promise((resolve, reject) => {
		mysqlconnection.query(`insert into book (name, author, copies_available) values ("${name}" ,"${author}", ${parseInt(copies_available)})`,
			(err,records)=>{
				if (!err){
					resolve(records);
				}
				reject(err);
		});

	})

	const bookRecord = await queryData;
	const bookId = bookRecord.insertId;
	tags.split(',').forEach((tag) => {
		mysqlconnection.query(`insert into tag (name, book_id) values ( "${tag.trim()}", ${parseInt(bookId)})`,(err,records)=>{
			if (err){
				return callback(err,null);
			}
			
		})
	})
	return callback(null,"data successfully submitted!!");
	
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

	mysqlconnection.query(`insert into borrower_detail (id,issued_from,issued_to,issued_by,member_id,book_id,status) values (${parseInt(id)},${STR_TO_DATE(issued_from, '%d-%M-%Y')},"${STR_TO_DATE(issued_to, '%d-%M-%Y')}","${parseInt(issued_by)}","${parseInt(member_id)}",${parseInt(book_id)}),"${status}"`,(err,records,fields)=>{
		if (!err){
			return callback(null,records);
		}
		return callback(err,null);
	})
}

searchBook = function(searchElement, pageNo, limitPerPage, callback) {
	const query = `select distinct(b.name), b.author, b.copies_available, b.id,
	(select count(distinct(b.id)) from book b inner join tag t on t.book_id = b.id
	where b.name like "%${searchElement}%" or 
	b.author like "%${searchElement}%" or
	t.name like "%${searchElement}%")  as totalSearchedBooks
	from book b inner join tag t on t.book_id = b.id
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


searchMember = function(searchElement, pageNo, limitPerPage, callback) {

	const query = `select * from member where name like "%${searchElement}%" 
	limit ${(parseInt(pageNo)-1)*limitPerPage}, ${limitPerPage}` ; 

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
			return callback(null, `Tag ID ${id} has been successfully deleted!`);
		}
		return callback(err, null);
	})
}

getTotalNoOfBooks = function() {
	mysqlconnection.query(`select count(*) from book`, (err, count) => {
		if (!err) {
			return count
		}
		return err
	})
}

module.exports = {getMemberData, getBookData, getBorrower, getBorrowerData, postMemberData, postBookData,
postBorrowerData, getMember, getBook,updateBook, updateMember, deleteBook, deleteMember, searchBook,
searchMember, getTagData, getTag, deleteTag, getTotalNoOfBooks}