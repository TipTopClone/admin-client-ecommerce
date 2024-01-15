import axios from 'axios';

const rootAPI = import.meta.env.VITE_ROOT_API;
const userAPI = rootAPI + '/users';

const getAccessJWT = () => {
  return sessionStorage.getItem('accessJWT');
};

const getRefreshJWT = () => {
  return localStorage.getItem('refreshJWT');
};

const apiProcessor = async ({ method, url, data, isPrivate, refreshToken }) => {
  try {
    const token = refreshToken ? getRefreshJWT() : getAccessJWT();
    const headers = {
      Authorization: isPrivate ? token : null,
    };
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message.includes('jwt expired')) {
      const { accessJWT } = await fetchNewAccessJWT();

      if (accessJWT) {
        sessionStorage.setItem('accessJWT', accessJWT);
        return apiProcessor({ method, url, data, isPrivate, refreshToken });
      }
    }
    return {
      status: 'error',
      message: error.message,
    };
  }
};

// =============== user api

//create user

export const postNewAdmin = (data) => {
  return apiProcessor({
    method: 'post',
    url: userAPI,
    data,
  });
};

export const postVerifyEmail = (data) => {
  return apiProcessor({
    method: 'post',
    url: userAPI + '/verify-email',
    data,
  });
};

export const postSignIn = (data) => {
  return apiProcessor({
    method: 'post',
    url: userAPI + '/signin',
    data,
  });
};

export const fetchAUser = () => {
  return apiProcessor({
    method: 'get',
    url: userAPI,

    isPrivate: true,
  });
};

//request new accessJWT
export const fetchNewAccessJWT = () => {
  return apiProcessor({
    method: 'get',
    url: userAPI + '/get-accessjwt',
    isPrivate: true,
    refreshToken: true,
  });
};

//request new accessJWT
export const logoutUser = (_id) => {
  return apiProcessor({
    method: 'post',
    url: userAPI + '/logout',
    data: {
      _id,
      accessJWT: getAccessJWT(),
    },
  });
};

export const requestOTP = (email) => {
  return apiProcessor({
    method: 'post',
    url: userAPI + '/request-otp',
    data: {
      email,
    },
  });
};
