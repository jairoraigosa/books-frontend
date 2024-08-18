const initialState = {
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default userReducer;
