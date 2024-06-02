import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
    destination: "/src/public/uploads/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
});

const upload = multer({storage})

router.get('/add', (req, res) => {
    res.render('productos/add')
})