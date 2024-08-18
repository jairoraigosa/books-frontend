export const setToken = (user) => {
  return {
    type: 'SET_TOKEN',
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};