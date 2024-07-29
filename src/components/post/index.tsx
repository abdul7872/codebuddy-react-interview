import PropTypes from "prop-types";
import React from "react";

const PostDetails = ({ post }) => {
  return (
    <div key={post.id} className="rounded-lg bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-center">
        <img src={post.avatar} alt="Author Avatar" className="mr-4 h-12 w-12 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">
            {post.firstName} {post.lastName}
          </h2>
        </div>
      </div>
      <img src={post.image} alt="Post Image" className="mb-4 h-48 w-full rounded-lg object-cover" />
      <p className="text-gray-700">{post.writeup}</p>
    </div>
  );
};

export default PostDetails;
PostDetails.propTypes = {
  post: PropTypes.object,
};
