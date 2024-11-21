import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../redux/post/action";

const AllPost = () => {
  const { fetch_post_pending, fetch_post } = useSelector((state) => state?.postReducer);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPost());
  }, [])

  return (
    <div className="bg-gray-100">
      <div className="container max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 py-20 px-4">
          {fetch_post_pending ? (
            <p>Loading...</p>
          ) : (
            fetch_post?.slice(0, 6).map((post, index) => (
              <Link to={`/post/${post.id}`} key={index}>
                <div className="max-w-sm mx-auto h-full bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-orange-100 flex justify-center items-center">
                      <img
                        src={`http://localhost:8000/${post.image}`}
                        alt={post.title || "Placeholder"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.categories}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-2">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      {post.title || "Untitled Post"}
                    </h2>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {post.description || "No description available."}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPost;
