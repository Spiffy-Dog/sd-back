const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  return await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

module.exports = {
  connectMongo,
};
