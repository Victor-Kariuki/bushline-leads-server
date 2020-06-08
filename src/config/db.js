// src/config/db.js

module.exports = (mongoose) => {
  try {
    mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB successfully connection');
  } catch (e) {
    console.error('MongoDB connection error:');
  }
};
