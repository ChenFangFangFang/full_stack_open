const KEY = "blogUserKey";

const saveUser = (user) => {
  window.localStorage.setItem(KEY, JSON.stringify(user));
};

const loadUser = () => {
  const user = window.localStorage.getItem(KEY);
  return user ? JSON.parse(user) : null;
};

const me = () => {
  const user = loadUser();
  return user ? user.username : null;
};

const removeUser = () => {
  window.localStorage.removeItem(KEY);
};

export default { saveUser, loadUser, removeUser, me };
