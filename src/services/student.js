import { get, post } from '../utils/request';

// 获取学生信息
export function getData(id) {
  return get(`/api/v1/students/${id}.json`);
}

/**
 * 创建班级信息
 * @export
 * @param {object} payload
 *  name(班级名字), description(描述信息), grade_id(班级id), col_id(列id), row_id(第几排id), qq(qq号), mobile(手机号)
 * @returns 返回Promise对象
 */
export function create(payload) {
  console.log(payload);
  return post('/api/v1/students', payload);
}
