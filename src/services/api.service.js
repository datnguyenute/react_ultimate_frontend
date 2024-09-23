import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  return axios.post(URL_BACKEND, {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  });
};

const updateUserAPI = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  return axios.put(URL_BACKEND, {
    _id: _id,
    fullName: fullName,
    phone: phone,
  });
};

const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  return axios.put(URL_BACKEND, {
    _id: _id,
    fullName: fullName,
    phone: phone,
    avatar: avatar,
  });
};

const uploadFileAPI = (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      "upload-type": folder,
    },
  };

  const data = new FormData();
  data.append("fileImg", file);

  return axios.post(URL_BACKEND, data, config);
};

const deleteUserAPI = (_id) => {
  const URL_BACKEND = `/api/v1/user/${_id}`;
  return axios.delete(URL_BACKEND);
};

const fetchUsersAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

const registerUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  return axios.post(URL_BACKEND, {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  });
};

const loginAPI = (email, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  return axios.post(URL_BACKEND, {
    username: email,
    password: password,
  });
};

const getAccountAPI = () => {
  const URL_BACKEND = "/api/v1/auth/account";
  return axios.get(URL_BACKEND);
};

const logoutAPI = () => {
  const URL_BACKEND = "/api/v1/auth/logout";
  return axios.post(URL_BACKEND);
};

// Book api
const fetchBookAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

const createBookAPI = (
  mainText,
  author,
  price,
  quantity,
  category,
  thumbnail
) => {
  const URL_BACKEND = "/api/v1/book";
  return axios.post(URL_BACKEND, {
    mainText,
    author,
    price,
    quantity,
    category,
    thumbnail,
  });
};

const updateBookAPI = (
  _id,
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const URL_BACKEND = `/api/v1/book`;
  const data = {
    _id: _id,
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.put(URL_BACKEND, data);
};

const deleteBookAPI = (id) => {
  const URL_BACKEND = `/api/v1/book/${id}`;
  return axios.delete(URL_BACKEND);
};

export {
  createUserAPI,
  updateUserAPI,
  fetchUsersAPI,
  deleteUserAPI,
  uploadFileAPI,
  updateUserAvatarAPI,
  registerUserAPI,
  loginAPI,
  getAccountAPI,
  logoutAPI,
  fetchBookAPI,
  createBookAPI,
  updateBookAPI,
  deleteBookAPI,
};
