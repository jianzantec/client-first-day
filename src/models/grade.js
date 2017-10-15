import { routerRedux } from 'dva/router';
import { getData, create } from '../services/grade';

export default {
  namespace: 'grade',
  state: {
    gradeInfo: {
      grade: {
        name: '',
        id: '',
      },
      cols: [],       // 所有的列
      rows: [],       // 所有的行
      students: [],   // 当前班级的学生信息
      table: [],      // 学生座次信息
    },
  },
  subscriptions: {
    // 默认初始化时不加载数据
    // setup({ dispatch, history }) {  // eslint-disable-line
    //   dispatch({ type: 'fetch', payload: { id: 23 } });
    // },
  },
  effects: {
    // 获取数据
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield call(getData, payload.id);
      yield put({ type: 'save', payload: { gradeInfo: { ...res.data.data } } });
    },
    // 创建班级信息
    *add({ payload }, { call, put }) {
      const res = yield call(create, payload);
      yield put({
        type: 'fetch',
        payload: {
          id: res.data.info,
        },
      });
      yield put(routerRedux.push({
        pathname: '/',
      }));
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
