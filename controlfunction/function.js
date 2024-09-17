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
        //  isBorrowed : false,
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

         console.log('calledd');
         
        const bookk= await  libraryBook.find();
        if(bookk) {
           return res.json({
               msg: 'product   fetched successfully',
               product: bookk
             })
        } else {
           return res.json({
               msg: 'book not  fetched',
             })
        }
   
    }


  //  // app.put("/product/:id",//  
  //  async function putBook(req,res){
   
  //       // const id= req.params.id;
       
  //           try {
              
  //               const {id,title,author}= req.body
  //             const book = await libraryBook.findById(id);
         
  //             console.log("apple");
  //             if (!book) {
  //               return res.status(404).json({ message: 'Book not found' });
  //             }
  //         book.title = title;
  //         book.author = author;
  //             await book.save();
  //             res.json(book);
  //           } catch (err) {
  //             res.status(500).json({ message: err.message });
  //           }
  //       }
  async function putBook(req,res) {
    try{
        const {id} = req.body; 
        const{title,author} = req.body;
        if(!title || !author )
        {
            return res.status(400).json({
                message:"Enter all details"
            })
        }
        const bookData = await libraryBook.findByIdAndUpdate({_id : id},{
            title : title,
            author : author,
           
    
        })
    
        res.status(200).json({
            message :"Data Updated Successfully",
            book : bookData 
        })
    }
    catch (err){
        res.status(500).json({
            message :"Error Updating Data",
           error : err
        })
    }
}

  
          
    

        async function deleteBook(req, res) {

          console.log("hiytt");
          
            try {
              const { id} = req.body;
              console.log(id);
              
          
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
                success: true
              });
            } catch (err) {
              console.error(err); // Log the error for debugging
              res.status(500).json({
                message: "Data Deletion Failed",
                success: false
              });
            }
          }
        // async function deleteBook(req,res) {
        //   try{
        //     const {id} = req.body
        
        //     const bookData = await libraryBook.findByIdAndDelete ({_id:id})
        
        //     res.status(200).json({
        //         message :"Data Deleted Successfully",
        //         book : bookData 
        //     })
        //   }
        //   catch (err){
        //     res.status(500).json({
        //         message :"Data Deletion Failed",
        //         book : bookData 
        //     })
        //   }
        // }
        
        //   async function patchBook(req,res)
        //   {
        //     try {
              
        //       const {id}= req.body
        //       const {isBorrowed}=req.body
        //     const book = await libraryBook.findById(id);
       
        //   console.log("appl",id)
        //     if (!book) {
        //       return res.status(404).json({ message: 'Book not found' });
        //     }
        // book.isBorrowed = isBorrowed;
     
        //     await book.save();
        //     res.json(book);
        //   } catch (err) {
        //     res.status(500).json({ message: err.message });
        //   }


        //   }
        async function patchBook(req,res) {

          try{
            const {id} = req.body
            const{isBorrowed} = req.body;
        
            const bookData = await libraryBook.findByIdAndUpdate({_id:id},{
                isBorrowed:isBorrowed
            })
        
            res.status(200).json({
                message :"Data Updated Successfully",
                book : bookData 
            })
          }
          catch (err){
            res.status(500).json({
                message :"Error Updating Book status",
               error :err
      })
        }
        }
          

 module.exports={postBook,getBook,putBook,deleteBook,patchBook}