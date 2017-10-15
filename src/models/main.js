import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { isLogined } from '../utils/tools';

export default {

  namespace: 'main',

  state: {
    collapsed: false, // 是否收缩导航
    msg: {}, // 全局提示
    isAdmin: false, // 是否管理状态
    selectedKeys: ['1'], // 当前选中的内容
  },


  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname, state, query, params }) => { // eslint-disable-line
        console.log(pathname);
        // console.log(state);
        // console.log(query);
        // console.log(params);
        if (pathname === '/student_reg') { // 如果是学生注册页面,判断是否有班级信息做为参数进行传递, 不需要注册
          if (!query.grade_id) { // 不存在班级参数跳转到登陆页面
            dispatch(routerRedux.push('/login'));
          } else {
            console.log(query.grade_id);
            dispatch({
              type: 'grade/fetch',
              payload: {
                id: query.grade_id,
              },
            });
          }
          return;
        }
        if (pathname === '/reg') {
          return;
        }
        if (pathname !== '/login') { // 如果当前地址不是登陆页面,需要判断是否登陆
          if (!isLogined()) { // 判断是否登陆,所有的用户页面都需要登陆
            dispatch(routerRedux.push('/login'));
          } else {
            dispatch({ type: 'save', payload: { isAdmin: true } });
            dispatch({ type: 'member/fetch', payload: { id: isLogined() } });
          }
        }
        if (pathname === '/') {
          // 处理当前导航栏选中的效果
          dispatch({
            type: 'save',
            payload: {
              selectedKeys: ['1'],
            },
          });
        }
      });
      // if (location.query.id) {
      //   console.log(location.query);
      // }
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    toggle(state) {
      return { ...state, ...{ collapsed: !state.collapsed } };
    },
    msg(state, action) {
      const { type, msg } = action.payload;
      message[type](msg);
      return { ...state, ...{ msg: action.payload } };
    },
  },

};
