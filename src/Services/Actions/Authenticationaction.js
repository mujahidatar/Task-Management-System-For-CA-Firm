// authActions.js
export const login = (user) => {
  // Store the user data in localStorage
  sessionStorage.setItem('loggedInUser', JSON.stringify(user));

  return {
    type: 'LOGIN',
    payload: user,
  };
};

export const logout = () => {
  // Remove the user data from localStorage
  sessionStorage.removeItem('loggedInUser');

  return {
    type: 'LOGOUT',
  };
};
