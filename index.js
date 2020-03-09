const app = require('express')();
const uuid = require('uuid');
const PORT = 3000;
const connection  = require('./connection.js')
const helper = require('./helper.js');
const bodyParser = require('body-parser');
app.listen(PORT,() => console.log(`server running on port ${PORT} `));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.get('/members',(req,res)=>{
	const result = helper.getMemberData((err,data)=>{
		if (!err){
			res.status(200).json({"Members":data});
			return
		}
		res.json({Error:err})
	});
})

app.get('/members/:id',(req,res)=>{
	const id = req.params.id;
	const result = helper.getMember(id,(err,data)=>{
		if (!err){
			if (data.length!==0){
				res.status(200).json({"Member":data});
				return
			}
			res.send({msg:`No Member of ID : ${id}`})
			return
		}
		res.json({Error:err})
	});
})

app.post('/members',(req,res)=>{
	const body = req.body;
	helper.postMemberData(body,(err,data)=>{
		if (!err){
			res.json({Member:body});
			return
		}
		res.json({Error:err})
	})	
})

app.get('/books',(req,res)=>{
	const result = helper.getBookData((err,data)=>{
		if (!err){
			return res.status(200).json({"Books":data});
		}
		return res.json({Error:err})
	});
})

app.get('/books/:id',(req,res)=>{
	const id = req.params.id;
	const result = helper.getBook(id,(err,data)=>{
		if (!err){
			if (data.length!==0){
				res.status(200).json({"Book":data});
				return
			}
			res.send({msg:`No Books of ID : ${id}`})
			return
		}
		res.json({Error:err})
		return
	});
})

app.post('/books',(req,res)=>{
	const body = req.body;
	helper.postBookData(body,(err, data)=>{
		if (err){
			return res.json({Error : err})
		}
				
	})	
})

app.put('/members/:id',(req,res)=>{
	const id = req.params.id;
	const body = req.body;
	helper.updateMember(id,body,(err,data)=>{
		if (!err) {
			if (data.affectedRows===0){
				res.json({msg:`ID ${id} not present!`});
				return
			}
			res.send({msg:`ID : ${id} updated successfully`});
			return
		}
		res.json({Error:err})
	})
})

app.put('/books/:id',(req,res)=>{
	const id = req.params.id;
	const body = req.body;
	helper.updateBook(id,body,(err,data)=>{
		if (!err) {
			if (data.affectedRows===0){
				res.json({msg:`ID ${id} not present!`});
				return
			}
			res.send({msg:`ID : ${id} updated successfully`});
			return
		}
		res.json({Error:err})
	})
})

app.delete('/books/:id',(req,res)=>{
	const id = req.params.id;
	helper.deleteBook(id,(err,data)=>{
		if (!err){
			if (data.affectedRows===0){
				res.json({msg:`ID ${id} not present!`});
				return
			}
			res.json({msg:`ID : ${id} deleted successfully`})
			return
		}
		res.json({Error:err})
	})
})

app.delete('/members/:id',(req,res)=>{
	const id = req.params.id;
	helper.deleteMember(id,(err,data)=>{
		if (!err){
			if (data.affectedRows===0){
				res.json({msg:`ID ${id} not present!`});
				return
			}
			res.json({msg:`ID : ${id} deleted successfully`})
			return
		}
		res.json({Error:err})
	})
})


app.get('/borrowers/',(req,res)=>{
	helper.getBorrowerData((err,data)=>{
		if (!err){
			res.json({Borrowers:data})
			return
		}
		res.json({Error:err})
	})
})

app.get('/borrowers/:id',(req,res)=>{
	const id = req.params.id;
	const result = helper.getBorrower(id,(err,data)=>{
		if (!err){
			if (data.length!==0){
				res.status(200).json({"Borrower":data});
				return
			}
			res.send({msg:`No Borrower of ID : ${id}`})
			return
		}
		res.json({Error:err})
	});
})


app.post('/borrowers',(req,res)=>{
	const body = req.body;
	helper.postBorrowerData(body,(err,data)=>{
		if (!err){
			res.json({Borrower:body});
			return
		}
		res.json({Error:err})
	})	
})

app.put('/borrowers/:id',(req,res)=>{
	const id = req.params.id;
	const result = helper.updateBorrower(id,(err,data)=>{
		if (!err){
			if (data.affectedRows===0){
				res.json({msg:`ID ${id} not present!`});
				return
			}
			res.send({msg:`Borrower of ID : ${id} updated successfully`})
			return
		}
		res.json({Error:err})
	});
})


app.delete('/borrowers/:id',(req,res)=>{
	const id = req.params.id;
	helper.deleteBorrower(id,(err,data)=>{
		if (!err){
			if (data.affectedRows===0){
				res.json({msg:`ID ${id} not present!`});
				return
			}
			res.json({msg:`ID : ${id} deleted successfully`})
			return
		}
		res.json({Error:err})
	})
})


app.post('/books/search',(req,res) => {
	const searchElement = req.body.book;
	let pageNo = req.body.page_no;
	let limitPerPage = req.body.limitPerPage;
	console.log("body",req.body);

	if (limitPerPage === undefined ){
		limitPerPage = 4; 
	}
	if (pageNo === undefined){
		pageNo = 1; 
	}

	helper.searchByBNT(searchElement, pageNo, limitPerPage, (err, data) => {
		if (!err) {
			res.json({Data:data});
			return
		}
		res.json({Error : err});
		return 
	})
})

app.get('/tags/:id',(req,res) => {
	const id = req.params.id;
	helper.getTag(id, (err,data) => {
		if (!err) {
			res.json({data : data});
			return
		}
		res.json({Error : err});
		return
	})
})

app.get('/tags',(req,res) => {
	helper.getTagData((err,data) => {
		if (!err) {
			res.json({data : data});
			return
		}
		res.json({Error : err});
		return
	})
})

app.delete('/tags/:id',(req,res) => {
	const id = req.params.id;
	helper.deleteTag(id,(err, data) => {
		if (!err) {
			res.json({msg : data});	
			return
		}
		res.json({Error : err});
		return
	})
})