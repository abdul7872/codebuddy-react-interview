import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostDetails from "../components/post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://codebuddy.review/posts");
      const responseData = await response.json();
      console.log(responseData, "123");
      setPosts(responseData?.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts, "1235");

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <PostDetails key={post?.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
