import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Button, Layout, Menu, Icon, Tag } from 'antd';
import styles from './IndexPage.css';

function IndexPage({ children, dispatch, main, member, grade }) {
  const { Sider, Content } = Layout;
  const { collapsed, isAdmin, selectedKeys } = main;
  const { memberInfo } = member;
  const { gradeInfo } = grade;
  const toCreateGrade = () => {
    dispatch(routerRedux.push({
      pathname: '/grade_create',
      state: {
        member_id: memberInfo.id, // 传递用户id 用于知道是哪一个用户创建的班级信息
      },
    }));
  };
  const navTo = (item) => {
    if (item.key === '1') {
      dispatch(routerRedux.push({ pathname: '/' }));
    }

    if (item.key === '2') {
      dispatch(routerRedux.push({ pathname: '/member_info' }));
    }
    dispatch({
      type: 'main/save',
      payload: { selectedKeys: [item.key] },
    });
  };
  return (
    <Layout className={styles.main}>
      <Sider trigger={null} collapsible collapsed={collapsed} >
        <Menu onClick={navTo} theme="dark" mode="inline" selectedKeys={selectedKeys} defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="appstore" />
            <span>我的班级</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user" />
            <span>个人信息</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Icon className={styles.trigger} type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={() => { dispatch({ type: 'main/toggle' }); }} />
        <Content style={{ margin: '1px 1px', padding: 0, background: '#fff', minHeight: 280 }}>
          <div>
            <Row>
              <Col className={styles.normal} span={20} offset={2}>
                <h2>{memberInfo.name}的班级</h2>
                {isAdmin ? (<Button onClick={toCreateGrade} style={{ display: 'block' }} type="primary">创建班级</Button>) : ''}
                <Row gutter={16} className={styles['grade-container']}>
                  <Col span={3}>
                    { memberInfo.grades.map((item) => {
                      let temColor = '#87d068';
                      if (item.id === gradeInfo.grade.id) {
                        temColor = '#f50';
                      }
                      return (<Tag className={styles['grade-item']} color={temColor} key={item.id} onClick={() => { dispatch(routerRedux.push({ pathname: '/' })); dispatch({ type: 'grade/fetch', payload: { id: item.id } }); }}>{item.name}</Tag>);
                    }) }
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span="20" offset="2">{children}</Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

IndexPage.propTypes = {
};
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(IndexPage);
