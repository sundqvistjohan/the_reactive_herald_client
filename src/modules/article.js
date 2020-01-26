import axios from "axios";

const getCurrentArticle = async id => {
  try {
    const response = await axios.get(`/articles/${id}`);
    return response.data.article;
  } catch (error) {
    if (error === "Network Error") {
      return { error: error.message };
    } else {
      return error.response.data;
    }
  }
};

const getArticles = async () => {
  const response = await axios.get("/articles");
  return response.data;
};

const createArticle = async (title, body) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    const response = await axios.post(
      "/admin/articles",
      {
        article: {
          title: title,
          body: body
        }
      },
      {
        headers: headers
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

const getUnpublishedArticles = async () => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios.get(`/admin/articles`, {
      headers: headers
    });
    return response.data.articles;
  } catch (error) {
    return error.message;
  }
};

const publishArticle = async id => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios({
      url: `/admin/articles/${id}`,
      headers: headers,
      method: "patch",
      params: {
          published: true
      }
    });
    return response.data
  } catch (error) {
    debugger
    return error.response.data.errors;
  }
};

export {
  getCurrentArticle,
  getArticles,
  createArticle,
  getUnpublishedArticles,
  publishArticle
};
