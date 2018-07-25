const express         =  require ('express'),
      bodyParser      =  require('body-parser'),
      mongoose        =  require('mongoose'),
      port            =  process.env.Port || 4500,
      schema          =  mongoose.Schema,
      app             =  express();

mongoose.connect("mongodb://localhost/africa_blog", (err) => {
  if(err) console.log('Not connected');
  console.log('Connect to DB');
});

app.set("view engine", "ejs" );
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

const blogSchema = new schema ({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default:Date.now
  }
});

const Blog = mongoose.model('blog', blogSchema);

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if(err) res.render('form')
    res.render('index', {blogs: blogs});
  })
});

app.get('/add/blog', (req, res) => {
  res.render('form');
});

app.post('/blogs', (req, res) => {
  console.log(req.body, 'yes');
  
   const  newBlog = new Blog({
     title: req.body.title,
     image: req.body.image,
     description: req.body.description
   });
   newBlog.save((err, blog)=> {
     if (err) console.log(err);
     console.log(blog);
     res.redirect('/blogs')
   })
})


 



app.listen(port, () => console.log(`Server running at port ${port}`));