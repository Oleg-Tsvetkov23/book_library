const uidGenerator = require('node-unique-id-generator');

class Books {
    constructor(title = "", desc = "", authors = "", favorite = "", cover = "", fname = "", id = uidGenerator.generateUniqueId()) {            
        this.title = title       
        this.description = desc
        this.authors = authors
        this.favorite = favorite
        this.fileCover = cover
        this.fileName = fname
        this.id = id;
        this.fileBook = ""
    }
}

module.exports = Books;