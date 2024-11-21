import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailedPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [postByCategory, setPostByCategory] = useState([]);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/post/single-post/${id}`
        );
        setPost(response.data.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchSinglePost();
  }, [id]);

  useEffect(() => {
    const fetchAllPostCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/post/post-categories/${post.categories}`
        );
        setPostByCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchAllPostCategory();
  }, [post]);

  return (
    <div className="py-10 px-10 lg:px-0">
      <div className="container max-w-7xl mx-auto">
        {post && (
          <div>
            <div className="text-center">
              <span>
                Posted on{" "}
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
              </span>
              <h1 className="text-5xl font-bold mt-4">{post.title}</h1>
            </div>
            <img
              src={`http://localhost:8000/${post.image}`}
              alt={post.title || "Placeholder"}
              className="h-full w-full mt-10"
            />
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
              <div className="lg:col-span-2">
                <p className="text-justify">{post.description}</p>
              </div>
              <div className="lg:col-span-1">
                <h1 className="text-2xl font-semibold">Related post</h1>
                <div className="mt-3">
                  {postByCategory.map((nextPost, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-4"
                      >
                        <img
                          src={`http://localhost:8000/${nextPost.image}`}
                          alt={nextPost.title}
                          className="h-20 w-20"
                        />
                        <div>
                          <h3 className="text-md font-semibold">{nextPost.title}</h3>
                          <span className="text-sm">
                            {new Date(post.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}{" "}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedPost;
