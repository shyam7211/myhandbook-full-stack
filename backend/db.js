const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://shyamsunder:admin1234@contact-book-cluster.kix2je8.mongodb.net/myHandbook-backend?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
          const connect = await mongoose.connect(mongoURI);
          console.log("Connected to ",connect.connection.name ,"and the host is ", connect.connection.host);
        // console.log("Success"); check the commit "commit 0460a1821f1af56300ae175a12119951e0b4fa46"
      } catch (err) {
          console.log(err);
          process.exit(1);
      }
}


module.exports = connectToMongo;