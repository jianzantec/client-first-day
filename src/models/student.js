import { routerRedux } from 'dva/router';
import { getData, create } from '../services/student';

export default {
  namespace: 'student',
  state: {
    studentInfo: {
      student: {
      },
      grade: {
      },
      col: {
      },
      row: {
      },
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      // dispatch({ type: 'fetch' });
    },
  },
  effects: {
    // 获取数据
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield call(getData, 14);
      yield put({ type: 'save', payload: { gradeInfo: { ...res.data.data } } });
    },
    // 创建学生信息
    *add({ payload }, { call, put }) {
      // console.log(payload);
      yield call(create, payload);
      yield put({ type: 'grade/fetch' });
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
