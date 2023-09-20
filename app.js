//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import lodash from "lodash";

let posts = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const PORT=3000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.render("home", {startingContent: homeStartingContent , posts: posts});
}
);

app.get('/home', function(req, res) {
  res.redirect('/');
}
);

app.get('/about', function(req, res) {
  
  res.render("about.ejs", {aboutContent: aboutContent});
});

app.get('/contact', function(req, res) {
  res.render("contact.ejs", {contactContent: contactContent});
}
);

app.get('/compose', function(req, res) {
  res.render("compose.ejs");
}
);

app.get('/posts/:postName', function(req, res) {
  const requestedTitle = lodash.lowerCase(req.params.postName);
  let flag = 0;
  posts.forEach(function(post) {
    const storedTitle = lodash.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      flag = 1;
      res.render("post.ejs", {post: post});
    }
  });
  if (flag === 0) {
    res.send('<h1 style="color: red ;margin-left:30% ; margin-top:40vh; ">404 Page not found</h1>');
  }

});

app.post('/compose', function(req, res) {
 
  const post={
    title: req.body.title ,
    content: req.body.post,
    author: 'Prabhat',
    time: new Date().toLocaleString()
  };
  posts.push(post);
  res.redirect('/');
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});









