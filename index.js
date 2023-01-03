import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const upload = multer({ dest: "./api/fileanalyse" });

app.use(express.static(process.cwd() + "/public"));
app.get("/", (_, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.send({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
