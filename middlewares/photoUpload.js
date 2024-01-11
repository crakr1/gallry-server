import multer from "multer"
import path from 'path'

const DIR = './public/images'
//Setting storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR)
    },
    filename: (req, file, cb) => {
      const uinq = Date.now() +  path.extname(file.originalname)
      cb(null, file.fieldname +  '-' + uinq  );
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