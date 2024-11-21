const { v4: uuidv4 } = require('uuid');
const { db } = require('../database/db');
const bcrypt = require('bcrypt');
const createToken = require('../functions/createToken');
const multer = require("multer");
const path = require("path");

// Set up Multer storage and file checking
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

// Validate file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images Only!"));
  }
}

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("image");


const createUser = async (req, res) => {
  try {
    const { username, email, password } = req?.body;
    const user_id = uuidv4();

    // Check if the email already exists in the database
    const checkExistingUserQuery = `SELECT email FROM "user" WHERE email = $1`;
    const existingUserResult = await db.query(checkExistingUserQuery, [email]);

    if (existingUserResult?.rows?.length > 0) {
      throw new Error("Email is already registered, please login.");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const createUserQuery = `INSERT INTO "user" (user_id, username, email, password) 
                             VALUES($1, $2, $3, $4) RETURNING *`;

    const createUserOutput = await db.query(createUserQuery, [user_id, username, email, hashedPassword]);
    const user = createUserOutput?.rows?.[0];
    res.status(200).json({ code: 200, data: user, message: "User is registered" });
  } catch (error) {
    res.status(400).json({ code: 400, message: error?.message });
  }
};

// login user
const login = async(req, res) => {
    try {
        const {email, password} = req?.body;

        const existingUser = `SELECT email FROM "user" WHERE email = $1`;
        const existingUserOutput = await db.query(existingUser, [email])
        if (existingUserOutput?.rows?.length === 0) {
            throw new Error("Email is not registered, please registered.");
        }
        const loginQuery = `SELECT * FROM "user" WHERE email = $1`;
        const loginResult = await db.query(loginQuery, [email]);
        const loginUser = loginResult?.rows?.[0];
        const isPasswordCorrect = await bcrypt.compare(password, loginUser?.password);
        if (!isPasswordCorrect) {
        throw Error("Passowrd Incorrect");
        }
        await delete loginUser.password;
        const token = await createToken(loginUser);
        res.status(200).json({code:200, data:loginUser, token})
    } catch (error) {
        res.status(400).json({code:400, message:error?.message})
    }
}

// Upload user image
const userImage = async (req, res) => {
  try {
    const {id} = req?.params
    const image = req.file ? `uploads/${req.file.filename}` : null;
    const uploadUserImageQuery = `
        INSERT INTO "profile-image" (user_id, image) 
        VALUES ($1, $2)
        ON CONFLICT (user_id) 
        DO UPDATE SET image = EXCLUDED.image
        RETURNING *;
      `;


      const uploadUserImageResult = await db.query(uploadUserImageQuery, [id, image]);
      const uploadImage = uploadUserImageResult?.rows?.[0];

      res.status(200).json({
        code: 200,
        data: uploadImage,
        message: "User image upload successfully.",
      });
  } catch (error) {
    
  }
}


module.exports = { createUser, login, userImage };
