const libraryBook=require("../bookschema/book")

async function postBook(req,res) {
    try{
     const {title,author} = req.body;
     
     if(!title || !author )
     {
         return res.status(400).json({
             message:"Enter all details"
         })
     }
  
     const findBook = await libraryBook.findOne({title:title});
   
     if(findBook)
     {
         return res.status(400).json({
             message : "Book Already Exist"
         })
     }
     const bookData = await libraryBook.create({
         title : title,
         author : author,
         isBorrowed : false,
     })
 
     res.status(200).json({
         message :"Data Created Successfully",
         book : bookData 
     })
    }
    catch (err){
     res.status(500).json({
         message :"Data Creation Failed",
         error : err 
     })
    }
 }
 

    async function getBook(req,res){
        const bookk= await  libraryBook.find();
        if(bookk) {
           return res.json({
               msg: 'product   fetched successfully',
               product: bookk
             })
        } else {
           return res.json({
               msg: 'product  not  fetched',
             })
        }
   
    }


   // app.put("/product/:id",//  
   async function putBook(req,res){
   
        // const id= req.params.id;
       
            try {
              
                const {id,title,author}= req.body
              const book = await libraryBook.findById(id);
         
              console.log("apple");
              if (!book) {
                return res.status(404).json({ message: 'Book not found' });
              }
          book.title = title;
          book.author = author;
              await book.save();
              res.json(book);
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
        }
    
          
          
    

        async function deleteBook(req, res) {
            try {
              const { id } = req.params;
          
              if (!id) {
                return res.status(400).json({
                  message: "ID is required",
                });
              }
          
              const bookData = await libraryBook.findByIdAndDelete(id);
          
              if (!bookData) {
                return res.status(404).json({
                  message: "Book not found",
                });
              }
          
              res.status(200).json({
                message: "Data Deleted Successfully",
                book: bookData,
              });
            } catch (err) {
              console.error(err); // Log the error for debugging
              res.status(500).json({
                message: "Data Deletion Failed",
              });
            }
          }
          

 module.exports={postBook,getBook,putBook,deleteBook}