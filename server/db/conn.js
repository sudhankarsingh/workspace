  const mongoose= require('mongoose');

  const db=process.env.DATABASE;
mongoose.connect(db,
    ).then(()=>{
         console.log('database connected');
    }).catch(err=>{
          console.log('connection failed');
    });
    
       const DB = mongoose.connection;
       DB.on("error", console.error.bind(console, "connection error: "));
       DB.once("open", function () {
         console.log("Connected successfully");
       });

