import axios from "axios";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

const login = async (username, password) => {
    const response = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/login`, {username, password}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
    }
    return response;
};

const logout = () => {
    localStorage.removeItem("token");
    // return axios.post(API_URL + "login/logout").then((response) => {
    //     return response.data;
    // });
};

const getCurrentUser = () => {
  const token = JSON.parse(localStorage.getItem("token"));
    if(token){
        return token;
    }else{
        return false;
    }
};

const LoginService = {
  login,
  logout,
  getCurrentUser,
}

export default LoginService;
