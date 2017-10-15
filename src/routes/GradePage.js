import React from 'react';
import { connect } from 'dva';
import GS from '../components/GradeStudent';

function GradePage({ dispatch, grade, main, location }) {
  const { gradeInfo } = grade;
  const { isAdmin } = main;
  const gsProps = {
    gradeInfo,
    dispatch,
    location,
    isAdmin,
  };
  return (
    <div>
      <GS gsProps={gsProps} />
    </div>
  );
}

GradePage.propTypes = {
};
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(GradePage);
