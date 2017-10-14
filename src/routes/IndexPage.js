import React from 'react';
import { connect } from 'dva';
// import styles from './IndexPage.css';
import GS from '../components/GradeStudent';

function IndexPage({ dispatch, gradeInfo}) { // eslint-disable-line
  // dispatch({ type: 'grade/fetch' });
  // const loadData = () => {
  //   dispatch({ type: 'grade/fetch' });
  // };
  const gsProps = {
    gradeInfo,
    dispatch,
  };
  return (
    <div>
      <GS gsProps={gsProps} />
    </div>
  );
}

IndexPage.propTypes = {
};
function mapStateToProps(state) {
  return state.grade;
}

export default connect(mapStateToProps)(IndexPage);
