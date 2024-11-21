const multer = require("multer");
const path = require("path");
const { db } = require("../database/db");

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

// Controller to handle post creation
const createPost = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ code: 400, message: err.message });
    }

    try {
      const { created_by_user_id, title, description, tags, categories } = req.body;
      const image = req.file ? `uploads/${req.file.filename}` : null;
      let parsedTags = null;
      if (tags) {
        try {
          parsedTags = JSON.parse(tags); // Attempt to parse tags as JSON
        } catch (parseError) {
          return res.status(400).json({
            code: 400,
            message: "Invalid format for tags. Ensure it is a stringified array.",
          });
        }
      }

      const createPostQuery = `
        INSERT INTO "post" 
        (created_by_user_id, title, description, tags, categories, image) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *;
      `;
      const values = [created_by_user_id, title, description, parsedTags, categories, image];

      const createPostResult = await db.query(createPostQuery, values);
      const createdPost = createPostResult.rows[0];

      res.status(200).json({
        code: 200,
        data: createdPost,
        message: "Post created successfully.",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ code: 500, message: error.message });
    }
  });
};

// Fetch all post
const fetchAllPost = async (req, res) => {
  try {
    const fetchAllPostQuery = `SELECT * FROM "post"`;
    const fetchAllPostResult = await db.query(fetchAllPostQuery);
    const fetchAllPost = fetchAllPostResult?.rows;
    res.status(200).json({code:200, data:fetchAllPost})
  } catch (error) {
    res.status(400).json({code:400, message:error?.message})
  }
}

// Fetch single post
const fetchSinglePost = async (req, res) => {
  try {
    const {id} = req?.params
    const fetchSinglePostQuery = `SELECT * FROM "post" WHERE id = $1`;
    const fetchSinglePostResult = await db.query(fetchSinglePostQuery, [id]);
    const fetchSinglePost = fetchSinglePostResult?.rows?.[0];
    res.status(200).json({code:200, data:fetchSinglePost})
  } catch (error) {
    res.status(400).json({code:400, message:error?.message})
  }
}

// fetch post by categories
const fetchPostByCategory = async (req, res) => {
  try {
    const { categories } = req.params;
    const fetchPostQuery = `SELECT * FROM "post" WHERE "categories" = $1`;
    const fetchPostResult = await db.query(fetchPostQuery, [categories]);
    const postsByCategory = fetchPostResult?.rows;
    if (postsByCategory.length === 0) {
      return res.status(404).json({ code: 404, message: `No posts found for category ${category}` });
    }
    res.status(200).json({ code: 200, data: postsByCategory });
  } catch (error) {
    res.status(400).json({ code: 400, message: error?.message });
  }
};


module.exports = { createPost, fetchAllPost, fetchSinglePost, fetchPostByCategory };
