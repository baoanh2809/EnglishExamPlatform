const DocumentSchema = require('../models/document.model')

module.exports = {
	
	createDocument: async function(req, res, next) {
		try {
			
            const newDoc = new DocumentSchema({
				title: req.body.title,
				content: req.body.content,
                description: req.body.description
			})
			const document = await newDoc.save();
			return res.status(200).json(document);
		}
		catch (error) {
			console.log(error)
			res.status(500)
		}
	},
	getDocuments: async function(req, res, next) {
		try {
			let docs = await DocumentSchema.find()
			return res.status(200).json(docs);
		}
		catch (error) {
			console.log(error)
			res.status(500)
		} 
	},
	getDocumentById: async function(req, res, next) {
		try {
			let doc = await DocumentSchema.findById(req.params.id)
            if (!doc) {
                return res.status(404).json({ message: 'Document not found' });
            }
			return res.status(200).json(doc);
		}
		catch (error) {
			console.log(error)
			res.status(500)
		} 
	}
}
