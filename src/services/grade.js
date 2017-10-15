import { get, post } from '../utils/request';

// 获取班级信息
export function getData(id) {
  return get(`/api/v1/grades/${id}.json`);
}

/**
 * 创建班级信息
 * @export
 * @param {object} payload
 *  name(班级名字), description(描述信息), rows(多少排), cols(每一排多少个位子), teacher(任课老师), master(班主任)
 * @returns 返回Promise对象
 */
export function create(payload) {
  // console.log(payload);
  return post('/api/v1/grades', payload);
}
