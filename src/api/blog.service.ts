import axiosInstance from "./axiosInstance";
import apiHelper from "./apiHelper";

interface CreateBlogPostParams {
  title: string;
  sub_title: string;
  paragraph_1: string;
  paragraph_2: string;
  fk_user: string
  id?: any
}

export const createBlogPost = async ({
  title,
  sub_title,
  paragraph_1,
  paragraph_2,
  fk_user,
  id
}: CreateBlogPostParams): Promise<any> => {
  return apiHelper(axiosInstance.post("/Blog", {
    title,
    sub_title,
    paragraph_1,
    paragraph_2, fk_user,
    id
  }), true);
}


export const updatepostblog = async ({
  title,
  sub_title,
  paragraph_1,
  paragraph_2,
  fk_user,
  id
}: CreateBlogPostParams): Promise<any> => {
  return apiHelper(axiosInstance.patch(`/Blog/${id}`, {
    title,
    sub_title,
    paragraph_1,
    paragraph_2, 
    fk_user,
    id
  }), true);
}

export const deletepostblog = async ({
  id
}): Promise<string> => {
  return apiHelper(axiosInstance.delete(`/Blog/${id}`, {
  }), true);
}