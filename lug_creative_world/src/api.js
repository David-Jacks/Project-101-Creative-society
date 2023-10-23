import axios from "axios";
import Axios from "axios";

export const Login = async(data) =>
{
    try {
        const response = await Axios.post("/api/auths/login", data);
        if (response.status === 200)
        {
            window.location.href = "/dashboard";
            return (response.data.details);
        } else 
        {
            return response.status;
        }
    } catch (error) {
        return (error.response.status);
    }
}

export const Logout = async() =>
{ 
    try {
        const response = await Axios.post("/api/auths/logout");
        if (response.status === 200)
        {
            window.location.href = "/";
        } else 
        {
            console.log(response);
        }
    } catch (error) {
        throw error;
    }
}

export const join = async(data) =>{
    try {
        const response = await Axios.post("/api/auths/register", data);
        if (response.status === 200)
        {
          window.location.href = "/loginpage";
        }else {
            return response.status;
        }
    } catch (error) {
        return (error.response.status);
    }
}

export const fetchUserData = async(id) =>{
    try {
        const response = await Axios.get(`/api/users/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// export const fetchPostData = async() =>{
//     try {
//         const response = await Axios.get("/api/posts");
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }

//implementing pagination when getting post
export const fetchPostData = async(offset) =>{
    try {
        const response = await Axios.get(`/api/posts?offset=${offset}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const fetchuserArticles = async(id) =>{
    try {
        const response = await Axios.get(`/api/posts/user/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const sendPostData = async(data) =>{
    try {
        const response = await Axios.post("/api/posts", data);
        if (response.status === 200)
        {
          window.location.href = "/dashboard";
        }else {
            console.log(response);
        }
    } catch (error) {
        throw error;
    }
}

export const getCat = async() =>{
    try {
        const response = await Axios.get("/api/categories");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getToppost = async() =>{
    try {
        const response = await Axios.get("/api/post/likes/top-liked");
        return response.data;
    } catch (error) {
        throw error;
    }
}
// getting top authors
export const getTopAuthors = async() =>{
    try {
        const res = await axios.get("/api/post/likes/topauthors/top-liked-authors");
        return res.data; 
    } catch (error) {
        throw error;
    }
}
export const deleteArticle = async(id) =>{
    const token = localStorage.getItem("token");

    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

    try {
        const response = await Axios.delete(`/api/posts/${id}`, config);
        if(response.status === 200)
        {
            window.location.reload();
        }
    } catch (error) {
        throw error;
    }
}

export const updateArticle = async(id, data) =>{
    try {
        const response = await Axios.put(`/api/posts/${id}`, data);
        if (response.status === 200)
        {
          window.location.href = "/dashboard";
        }else {
            console.log(response);
        }
    } catch (error) {
        throw error;
    }
}

export const saveArticle = async(id) =>{
    try {
        const response = await Axios.post(`/api/article/save-article/${id}`);
        if (response.status === 200)
        {
          window.location.reload();
        }else {
            console.log(response);
        }
    } catch (error) {
        throw error;
    }
}

//dealing with images

export const uploadProfileImage = async(file) =>{
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await axios.post("/api/profile/upload-profile-picture", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };

// export const uploadArticleImage = async(file) =>{
// try {
//     const formData = new FormData();
//     formData.append("file", file);
//     const res = await axios.post("/api/profile/", formData);
//     return res.data;
// } catch (err) {
//     console.log(err);
// }
// };

export const profileUpdate = async (data) =>{
    try{
        const res = await axios.post("/api/profile/upload-profile-picture", data);
        console.log("res...", res);
    }catch(err){
        throw err;
    }
}

// dealing with likes

export const handleLikeClick = async (id) =>{
    try{
        const res = await axios.post(`/api/post/likes/${id}`);
        return res.data;
    }catch(err){
        throw err;
    }
}

export const getLikes = async(id) =>{
    try {
        const response = await Axios.get(`/api/post/likes/${id}`);
        return response.data;
    } catch (error) {
        throw error; 
    }
}
// dealing with comments

export const postComment = async(id, body) =>{
    try {
        const res = await axios.post(`/api/posts/${id}/comments`, body);
        return res.data;
    } catch (error) {
        throw error;
    }
}
export const getComments = async(id) =>{
    try {
        const res = await axios.get(`/api/posts/${id}/comments`);
        return res.data;
    } catch (error) {
        throw error;
    }
}
export const delComment = async(id, commentid) =>{
    try {
        const res = await axios.delete(`/api/posts/${id}/comments/${commentid}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// dealing with searching

export const getArticleByCat = async(query) =>{
    try {
        const res = await axios.get(`/api/categories/${query}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getArticleByTitle = async(query) =>{
    try {
        const res = await axios.get(`/api/posts/search?q=${query}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}