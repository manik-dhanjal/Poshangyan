const express = require('express'),
    app = express(),
    mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://Anshaj:Anshaj123@poshangyan.w52ln.mongodb.net/poshangyan?retryWrites=true&w=majority"

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
}) 

// Way to use multer for "file" field in formdata
app.get('/', upload.single('file'), (req, res) => {
    console.log(req.body)
    console.log(req.params)
    console.log(req.file)
    return res.status(200).send({
        message: "All Ok"
    })
})
const { 
    getFilteredInfo,getThemeoftheMonth,getPolularVideos,addDownloadCount ,
    //  update 
    
    } 
     = require('./handlers/info');
const Auth = require('./Private/Auth')

const {uploadFile} = require('./handlers/upload')
app.post('/upload', uploadFile)
app.post('/getFilteredInfo', getFilteredInfo)
app.get('/getPopolarVideos', getPolularVideos)
app.get('/getThemesOfTheMonth', getThemeoftheMonth)
app.post('/addDownload',addDownloadCount)
// app.post('/update',update)

const {getPostInfo,deletePost,updatePostInfo} = require('./handlers/Posts')
app.get('/posts/:postID', getPostInfo)
app.delete('/posts/:postID',Auth, deletePost)
app.put('/posts/:postID',Auth, updatePostInfo)

const {addSortingData,getSortingData,modifySortingData} = require('./handlers/sortingDataRoutes')
// app.post('/addSortingData',Auth,addSortingData)
app.get('/getSortingData',getSortingData)
app.post('/modifySortingData',Auth,modifySortingData)

const {addAdmin,login} = require('./handlers/admin')

app.post('/login',login)

// app.get('/posts/:postID', getPostInfo)
// app.delete('/posts/:postID', deletePost)
// app.put('/posts/:postID', updatePostInfo)

// var a = require('./ASD.json')
// const Post = require('./schema/postSchema')
// console.log(a[1].label)
// let mp = {};

// var i = -1;
//  for(var j=0;j<a.length;j++) {
//     setTimeout(function() {
//         update()
//     },(j+j+1)*1000);
// }
// function update()
// {
//   i++;
//   Post.findById(a[i]._id.$oid)
//   .then((pos)=>{
//     currpos = pos;
//   if(pos&&a[i]){
//     pos.label = a[i].label;
//     let k=1;
//     let posid =  a[i].label.toLowerCase().split(' ').join("-")
//     while(mp[posid]!=null){
//       posid = posid + `-${k}`;
//       k++;
//     }
//     mp[posid] = 'hii'
//     pos.postId = posid;
//     console.log(pos)
//     return pos.save();
//   }
//   })
//   .then(()=>{
//       console.log({successful:i})
//   })
//   .catch((err)=>{
//     console.error(err)
//   })
// }
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// let a = {};
// let db = require('./ASD.json');
// const Post = require('./schema/postSchema')

// console.log(db[0]._id.$oid);
// for(var i=0;i<db.length;i++)
// {

//   var j=0;
//   let label = db[i].label

//   while(a[label]!=null){
//     label = label + `-${j}`;
//     j++;
//   }
//   a[label] = 'hii'

//   upda(db[i]._id.$oid,label)
  
// }

// function upda(ID,newlabel)  {
//   Post.findById(ID)
//   .then((pos)=>{
//     pos.lebel = newlabel;
//     console.log(pos)
//     pos.save();
//   })
// }


// const accountSid = "AC5a24e2518c95be55417fabc6934ca0a7";
// const authToken = "4bbba64ca48c860ec1412b6a3be0cd68";
// const client = require('twilio')(accountSid, authToken);
// app.post('/xx', async (req,res)=>{
//   let abc=null ;
//    try{
//     abc =  await client.messages
//   .create({
//      body: 'New items has been added on poshangyan. HAve a look at https://www.poshangyan.com/search?Themes=Any&sort=date',
//      from: '+12059531826',
//      to: '+919540820596'
//    })
//   }catch(e){
//     console.log(e);
//   }
//   console.log(abc)
//   res.send(abc)
// })

// async  function  asd(){
//   try{
//     return await client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+15017122661',
//      to: '+15558675310'
//    })
//   }catch(e){
//     console.log(e);
//   }
  
// } 


app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({
        message: message,
        data: data
    })
})



mongoose.connect(
    MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
)
.then(result =>{
    app.listen(process.env.PORT || 8080, ()=>{
        console.log('Server Started at port 8080')
    })
}).catch(err => {
    console.log(err);
    // next(err);
})