import multer from "multer"

const DIR = '../../images'
//Setting storage engine
const storage = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
      cb(null, `-${Date.now()}--${file.originalname}`);
    },
  });

const upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb ({message: "upload image file"})
        }
        cb(null, true)
    }
});
  
  
export default upload