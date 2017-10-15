import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Button } from 'antd';

const MemberInfoPage = ({ memberInfo }) => {
  const { user_name, name, mobile, qq, description } = memberInfo;
  return (<div>
    <Row>
      <Col span={16} offset={4}>
        <Card title={user_name}>
          <p>姓名:{name}</p>
          <p>联系方式:{mobile}</p>
          <p>qq:{qq}</p>
          <p>简介:{description}</p>
          <Button>修改信息</Button>
          <Button type="danger">修改密码</Button>
        </Card>
      </Col>
    </Row>
  </div>);
};

const mapStateToProps = (state) => {
  return state.member;
};
export default connect(mapStateToProps)(MemberInfoPage);
