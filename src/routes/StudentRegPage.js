import React from 'react';
import { connect } from 'dva';
import CreatStudent from '../components/CreatStudent';

const StudentRegPage = ({ dispatch, location }) => {
  // 传递参数到组件中
  const props = {
    location,
    dispatch,
  };

  return (
    <CreatStudent props={props} />
  );
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(StudentRegPage);
