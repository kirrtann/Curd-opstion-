import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createBlogPost, updatepostblog } from "@/api/blog.service";
import { useState, useEffect } from "react";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  sub_title: z.string().min(3, {
    message: "Sub-title must be at least 3 characters.",
  }),
  paragraph_1: z.string().min(10, {
    message: "Paragraph 1 must be at least 10 characters.",
  }),
  paragraph_2: z.string().min(10, {
    message: "Paragraph 2 must be at least 10 characters.",
  }),
  fk_user: z.string().uuid({ message: "User ID must be a valid UUID." }),
});

const CreateBlogPost = ({ post }: { post?: any }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [isEditMode, setIsEditMode] = useState(!!post || !!state?.post);
  const [blogData, setBlogData] = useState<any | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      sub_title: "",
      paragraph_1: "",
      paragraph_2: "",
      fk_user: "1845cfce-8f14-413f-a352-8d52d96bcf61",
    },
  });

  useEffect(() => {
    if (isEditMode && state?.post?.id) {
      const fetchBlogData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/blog/${state.post.id}`
          );
          setBlogData(response.data.data);
        } catch (error) {
          console.error("Error fetching blog data:", error);
        }
      };
      fetchBlogData();
    }
  }, [isEditMode, state?.post?.id]);

  useEffect(() => {
    if (isEditMode && blogData) {
      form.setValue("title", blogData.title);
      form.setValue("sub_title", blogData.sub_title);
      form.setValue("paragraph_1", blogData.paragraph_1);
      form.setValue("paragraph_2", blogData.paragraph_2);
      form.setValue("fk_user", "1845cfce-8f14-413f-a352-8d52d96bcf61");
    }
  }, [isEditMode, blogData, form]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = isEditMode
      ? await updatepostblog({
          ...values,
          id: state?.post?.id, 
        })
      : await createBlogPost({
          ...values,
          fk_user: "1845cfce-8f14-413f-a352-8d52d96bcf61",
        });
  
    if (response.status) {
      navigate("/");
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {isEditMode ? "Update Blog Post" : "Create a New Blog Post"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sub_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Sub Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paragraph_1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Paragraph 1</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder="Enter the first paragraph"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paragraph_2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Paragraph 2</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder="Enter the second paragraph"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md px-4 py-2"
              >
                {isEditMode ? "Update Post" : "Create Post"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Go back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;
