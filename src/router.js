import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage'; // 首页
// import StudentRegPage from './routes/StudentRegPage'; // 学生信息创建页面,暂时已不用
import GradePage from './routes/GradePage'; // 班级座次信息预览,可以创建学生信息
import GradeCreatePage from './routes/GradeCreatePage'; // 创建班级
import RegPage from './routes/RegPage'; // 注册页面
import LoginPage from './routes/LoginPage'; // 登陆页面
import MemberInfoPage from './routes/MemberInfoPage'; // 用户中心页

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
        <IndexRoute component={GradePage} />
        <Route path="grade_create" component={GradeCreatePage} />
        <Route path="member_info" component={MemberInfoPage} />
      </Route>
      <Route path="/reg" component={RegPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/student_reg" component={GradePage} />
    </Router>
  );
}

export default RouterConfig;
