import Cookies from 'js-cookie';

/**
 * 登陆
 * @param {*} id 用户id
 */
export const saveLoginData = (id) => {
  Cookies.set('user_id', id, {
    path: '/',
  });
};

/**
 * 删除保存的登陆信息
 */
export const removeLoginData = () => {
  Cookies.remove('user_id', {
    path: '/',
  });
};

/**
 * 获取当前登陆的id
 */
export const isLogined = () => {
  return Cookies.get('user_id');
};

