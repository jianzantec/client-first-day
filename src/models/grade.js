import { getData, add } from '../services/grade';

export default {
  namespace: 'grade',
  state: {
    gradeInfo: {
      grade: {
        name: '',
      },
      cols: [],       // 所有的列
      rows: [],       // 所有的行
      students: [],   // 当前班级的学生信息
      table: [],      // 学生座次信息
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({ type: 'fetch' });
    },
  },
  effects: {
    // 获取数据
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield call(getData, 14);
      yield put({ type: 'save', payload: { gradeInfo: { ...res.data.data } } });
    },
    // 创建班级信息
    *create({ payload }, { call }) {
      yield call(add, payload.data);
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
