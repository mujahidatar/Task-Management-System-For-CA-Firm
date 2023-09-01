// authReducer.js
const initialState = {
  user: JSON.parse(sessionStorage.getItem('loggedInUser')) || null,
};

const Loginreducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default Loginreducer;
