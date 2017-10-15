import { routerRedux } from 'dva/router';
import { login, reg, getMemberInfo } from '../services/member';
import { saveLoginData } from '../utils/tools';

export default {

  namespace: 'member',

  state: {
    memberInfo: {
      id: '',
      user_name: '',
      name: '',
      mobile: '',
      qq: '',
      description: '',
      grades: [],
    },
    error: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    // 获取用户信息
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield call(getMemberInfo, payload);
      yield put({ type: 'save', payload: { memberInfo: res.data.info } });
    },
    // 登陆
    *login({ payload }, { call, put }) { // eslint-disable-line
      const res = yield call(login, payload);
      if (res.data.status === 'y') {
        yield put({ type: 'save', payload: { memberInfo: res.data.info } });
        yield put({ type: 'main/save', payload: { isAdmin: true } });
        saveLoginData(res.data.info.id);
        yield put(routerRedux.push({
          pathname: '/',
        }));
      } else {
        yield put({ type: 'save', payload: { error: res.data.msg } }); // 设置错误提示信息
      }
    },
    // 注册
    *reg({ payload }, { call, put }) { // eslint-disable-line
      const res = yield call(reg, payload);
      if (res.data.status === 'y') {
        yield put({ type: 'save', payload: { memberInfo: res.data.info } });
        saveLoginData(res.data.info.id);
        yield put(routerRedux.push({
          pathname: '/',
        }));
      } else {
        yield put({ type: 'save', payload: { error: res.data.info } }); // 设置错误提示信息
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    clearError(state) { // 清楚错误提示内容
      return { ...state, ...{ error: '' } };
    },
  },

};
