import { routerRedux } from 'dva/router';
import { getData, create, deleteItem } from '../services/student';

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
      const res = yield call(getData, payload.id);
      yield put({ type: 'save', payload: { gradeInfo: { ...res.data.data } } });
    },
    // 创建学生信息
    *add({ payload }, { call, put }) {
      // console.log(payload);
      const res = yield call(create, payload);
      yield put({ type: 'grade/fetch', payload: { id: res.data.info.grade_id } });
      // 非管理后台重新跳转页面
      if (!payload.isAdmin) {
        yield put(routerRedux.push({
          pathname: `/student_reg?grade_id=${res.data.info.grade_id}`,
        }));
      }
    },
    *deleteItem({ payload }, { call, put }) { // id 需要删除的学生id, grade_id 当前班级id(用于重新获取数据)
      yield call(deleteItem, payload.id);
      yield put({ type: 'grade/fetch', payload: { id: payload.grade_id } }); // 重新获取班级信息
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
