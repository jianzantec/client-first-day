import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import StudentRegPage from './routes/StudentRegPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/student_reg" component={StudentRegPage} />
    </Router>
  );
}

export default RouterConfig;
