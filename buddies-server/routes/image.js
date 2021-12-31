const multer = require ("multer")
const Image = require("../models/image")
const ImageRouter = express.Router();

 
app.get("/",(req,res)=>{
    res.render("index");
})
 
app.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };
    imageModel.create(final_img,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
})
module.exports = router;