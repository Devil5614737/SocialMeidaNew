import axios from "axios";

const API_KEY = "0ed476327e4444e792543bbb41e45210";

const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const BACKEND_API = "http://localhost:4000/api";

const headers = {
  "x-auth-token": localStorage.getItem("token"),
};

const fetchNewsHeadlines = () => axios.get(NEWS_URL);

const loginUser = (email, password) =>
  axios.post(`${BACKEND_API}/login`, { email, password });
const signupUser = (fullname, email, password) =>
  axios.post(`${BACKEND_API}/signup`, { fullname, email, password });

const newPost = (caption, image) =>
  axios.post(`${BACKEND_API}/create-post`, { caption, image }, { headers });

const removePost = (postId) =>
  axios.post(`${BACKEND_API}/remove-post`, { postId }, { headers });

const fetchAllPosts = () =>
  axios.get(`${BACKEND_API}/all-posts`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
const otherUsers = () => axios.get(`${BACKEND_API}/other-users`, { headers });

const loggedUser = () => axios.get(`${BACKEND_API}/logged-user`, { headers });

const otherUserProfile = (userId) =>
  axios.get(`${BACKEND_API}/other-user-profile?userId=${userId}`, { headers });
const otherUserPosts = (userId) =>
  axios.get(`${BACKEND_API}/other-user-posts?userId=${userId}`, { headers });

const myPosts = () => axios.get(`${BACKEND_API}/my-posts`, { headers });

const editProfile = (fullname, profession, coverPic, pic) =>
  axios.put(
    `${BACKEND_API}/edit-profile`,
    { fullname, profession, coverPic, pic },
    { headers }
  );

const comment = (text, postId) =>
  axios.put(`${BACKEND_API}/comment`, { text, postId }, { headers });

const like = (postId) =>
  axios.put(`${BACKEND_API}/like`, { postId }, { headers });
const unLike = (postId) =>
  axios.put(`${BACKEND_API}/unlike`, { postId }, { headers });

const addFriend = (userId) =>
  axios.put(`${BACKEND_API}/add-friend`, { userId }, { headers });
const removeFriend = (userId) =>
  axios.put(`${BACKEND_API}/remove-friend`, { userId }, { headers });

const friends = () => axios.get(`${BACKEND_API}/friends`, { headers });


const searchUsers=(query)=>axios.get(`${BACKEND_API}/search-users/?search=${query}`,{headers})

const sharePost=(postId)=>axios.post(`${BACKEND_API}/share`,{postId},{headers})


export {
  fetchNewsHeadlines,
  loginUser,
  signupUser,
  newPost,
  fetchAllPosts,
  otherUsers,
  loggedUser,
  otherUserProfile,
  myPosts,
  otherUserPosts,
  editProfile,
  comment,
  like,
  unLike,
  addFriend,
  removeFriend,
  friends,
  removePost,
  searchUsers,
  sharePost
};
