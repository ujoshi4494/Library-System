const app = require('express')();
const uuid = require('uuid');
const cors = require('cors');
const PORT = 3004;
const connection  = require('./connection.js')
const helper = require('./helper.js');
const bodyParser = require('body-parser');
app.listen(PORT,() => console.log(`server running on port ${PORT} `));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


app.get('/members',(req,res)=>{
	const result = helper.getMemberData((err,data)=>{
		if (!err){
			return res.status(200).json({"data":data});
			
		}
		return res.json({Error:err})
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
			return res.send({msg:`No Member of ID : ${id}`})
		}
		return res.json({Error:err})
	});
})

app.post('/members',(req,res)=>{
	const body = req.body;
	helper.postMemberData(body,(err,data)=>{
		if (!err){
			return res.status(200).json({msg:data});
		}
		return res.json({Error:err})
	})	
})

app.get('/books',(req,res)=>{
	const result = helper.getBookData((err,data)=>{
		if (!err){
			return res.status(200).json({"data":data});
		}
		return res.json({Error:err})
	});
})

app.get('/books/:id',(req,res)=>{
	const id = req.params.id;
	const result = helper.getBook(id,(err,data)=>{
		if (!err){
			if (data.length!==0){
				return res.status(200).json({"data":data});
			}
			return res.send({msg:`No Books of ID : ${id}`})
		}
		return res.json({Error:err})
	});
})

app.post('/books',(req,res)=>{
	const body = req.body;
	helper.postBookData(body,(err, data)=>{
		if (!err){
			return res.status(200).send({msg : data});
		}
		return res.json({Error : err});				
	})	
})

app.post('/books', (req,res) => {
	const {pageNo, limitPerPage} = body;
	helper.getBooksOfPage(pageNo, limitPerPage, (err, data) => {
		if (!err) {
			return res.json({data : data});
		}
		return res.json({Error : err});
	})
})

app.post('/borrowers', (req, res) => {
	const body = req.body;
	helper.postBorrowerData(body, (err, data) => {
		if (!err) {
			return res.json({data : data});
		}
		return res.json({Error : err});	
	})
})

app.put('/members/:id',(req,res)=>{
	const id = req.params.id;
	const body = req.body;
	helper.updateMember(id,body,(err,data)=>{
		if (!err) {
			if (data.affectedRows===0){
				return res.json({msg:`ID ${id} not present!`});
			}
			return res.send({msg:`ID : ${id} updated successfully`});
		}
		return res.json({Error:err})
	})
})

app.put('/books/:id',(req,res)=>{
	const id = req.params.id;
	const body = req.body;
	helper.updateBook(id,body,(err,data)=>{
		if (!err) {
			if (data.affectedRows===0){
				return res.json({msg:`ID ${id} not present!`});
			}
			return res.send({msg:`ID : ${id} updated successfully`});
		}
		res.json({Error:err})
	})
})

app.delete('/books/:id',(req,res)=>{
	const id = req.params.id;
	helper.deleteBook(id,(err,data)=>{
		if (!err){
			if (data.affectedRows===0){
				return res.json({msg:`ID ${id} not present!`});
			}
			return res.json({msg:`ID : ${id} deleted successfully`})
		}
		return res.json({Error:err})
	})
})

app.delete('/members/:id',(req,res)=>{
	const id = req.params.id;
	helper.deleteMember(id,(err,data)=>{
		if (!err){
			if (data.affectedRows===0){
				return res.json({msg:`ID ${id} not present!`});
			}
			return res.json({msg:`ID : ${id} deleted successfully`})
		}
		return res.json({Error:err})
	})
})


app.get('/borrowers',(req,res)=>{
	helper.getBorrowerData((err,data)=>{
		if (!err){
			return res.json({Borrowers:data})
		}
		return res.json({Error:err})
	})
})


app.put('/borrowers/:id',(req,res)=>{
	const id = req.params.id;
	const result = helper.updateBorrower(id,(err,data)=>{
		if (!err){
			if (data.affectedRows===0){
				return res.json({msg:`ID ${id} not present!`});
			}
			return res.send({msg:`Borrower of ID : ${id} updated successfully`})
		}
		return res.json({Error:err})
	});
})


app.delete('/borrowers/:id',(req,res)=>{
	const id = req.params.id;
	helper.deleteBorrower(id,(err,data)=>{
		if (!err){
			if (data.affectedRows===0){
				return res.json({msg:`ID ${id} not present!`});
			}
			return res.json({msg:`ID : ${id} deleted successfully`})
		}
		return res.json({Error:err})
	})
})


app.post('/books/search',(req,res) => {
	const searchElement = req.body.searchItem;
	let pageNo = req.body.page_no;
	let limitPerPage = req.body.limitPerPage;

	if (limitPerPage === undefined ){
		limitPerPage = 4; 
	}
	if (pageNo === undefined){
		pageNo = 1; 
	}

	helper.searchBook(searchElement, pageNo, limitPerPage, (err, data) => {
		if (!err) {
			return res.json({data:data});
		}
		return res.json({Error : err});
	})
})

app.post('/members/search',(req,res) => {
	const searchElement = req.body.searchItem;
	let pageNo = req.body.page_no;
	let limitPerPage = req.body.limitPerPage;

	if (limitPerPage === undefined ){
		limitPerPage = 4; 
	}
	if (pageNo === undefined){
		pageNo = 1; 
	}

	helper.searchMember(searchElement, pageNo, limitPerPage, (err, data) => {
		if (!err) {
			return res.json({data:data});
		}
		return res.json({Error : err});
	})
})

app.get('/tags/:id',(req,res) => {
	const id = req.params.id;
	helper.getTag(id, (err,data) => {
		if (!err) {
			return res.json({data : data});
		}
		return res.json({Error : err});
	})
})

app.get('/tags',(req,res) => {
	helper.getTagData((err,data) => {
		if (!err) {
			return res.json({data : data});
		}
		return res.json({Error : err});
	})
})

app.delete('/tags/:id',(req,res) => {
	const id = req.params.id;
	helper.deleteTag(id,(err, data) => {
		if (!err) {
			return res.json({msg : data});	
		}
		return res.json({Error : err});
	})
})