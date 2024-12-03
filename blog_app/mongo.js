const mongoose = require("mongoose");
const Blog = require("./models/blog");
const url = process.env.MONGODB_URI;
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
mongoose.connect(url);
mongoose.set("strictQuery", false);

if (process.argv.length === 3) {
  Blog.find({}).then((result) => {
    console.log("blog:");

    result.forEach((blog) => {
      console.log(`${blog.title(20)} ${blog.author}`);
    });
    mongoose.connection.close();
    process.exit(1);
  });
} else if (process.argv.length === 5) {
  const blog = new Blog({
    title: process.argv[3],
    author: process.argv[4],
    url: process.argv[5],
    likes: process.argv[6]
  });

  Blog.save().then(() => {
    console.log("blog saved!");
    mongoose.connection.close();
    process.exit(1);
  });
}
