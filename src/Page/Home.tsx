import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { deletepostblog } from "@/api/blog.service";

const Home = () => {
  const [blogData, setBlogData] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blog");
        setBlogData(response.data.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);

  if (!blogData) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }
  const fetchBlogData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/blog');
      setBlogData(response.data.data);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };
  async function Deleteblog(id: string) {
    try {
      const response = await deletepostblog({ id });
      if (response) {

        console.log("Blog deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting the blog:", error);
    }
    fetchBlogData();

  }
  // const mediaIds = blogData.map((item: any) => item?.media?.url);
  // blogData.map((item) => {
  //   console.log(item.media?.url)
  // });

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-screen-xl mx-auto text-center px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold w-full "> Blogs</h1>

        </div>
      </header>

      <main className="py-8">
        <div className="max-w-screen-xl flex gap-5 mx-auto px-4">
          {blogData.map((post: any) => {
            // console.log(post?.media?.url);
            
            return (
              <div key={post.id} className="mb-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={post?.media?.url}
                      alt={post.title}
                      className="w-fit  object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-3xl font-semibold text-gray-800">{post.title}</h2>
                    <h3 className="text-xl text-gray-600 mt-2">{post.sub_title}</h3>
                    <p className=" text-gray-600 mt-4">{post.paragraph_1}</p>
                    <p className="text-gray-600 mt-2">{post.paragraph_2}</p>
                    <Button
                      className=" mt-2 text-indigo-600 hover:text-indigo-800"
                      onClick={() => navigate(`/createblogpost`, { state: { post } })}>
                      Update
                    </Button>
                    <Button
                      className=" ml-5 text-indigo-600 hover:text-indigo-800"
                      onClick={() => Deleteblog(post.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer is commented out */}
      {/* <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <p>&copy; 2024 Your Blog. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default Home;
