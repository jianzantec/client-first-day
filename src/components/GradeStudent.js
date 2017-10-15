import React from 'react';
import { Table, Button, Modal, Popover, Tag, message, Popconfirm } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard'; // 剪切板
// import { routerRedux } from 'dva/router';
import styles from './CreateStudent.css';
import hb from '../assets/hb.png';
import CreatStudent from '../components/CreatStudent';
import { siteUrl } from '../utils/config';

const GradeStudent = ({ gsProps }) => {
  const { grade, cols, table } = gsProps.gradeInfo;
  const { dispatch, location, isAdmin } = gsProps;
  // 传递给学生注册页面的数据
  const csProps = {
    dispatch,
    location,
    position: {}, // 位置信息
  };
  const tableCols = [];
  cols.forEach((item) => {
    const temCol = {};
    temCol.title = '';
    temCol.dataIndex = item.id;
    temCol.render = (txt, tItem) => {
      const cellData = tItem.info.find(d => d.c === item.id);  // 查找当前单元格需要显示的内容
      let popWin = {};
      // 弹窗关闭方法
      const closePopWin = () => {
        popWin.destroy();
      };
      // 单元格点击事件
      const tap = () => {
        // alert(cellText);
        // dispatch(routerRedux.push({
        //   pathname: '/student_reg',
        //   state: {
        //     grade_id: grade.id,
        //     row_id: cellData.r,
        //     col_id: cellData.c,
        //   },
        // }));
        csProps.position.row_id = cellData.r;
        csProps.position.col_id = cellData.c;
        csProps.position.grade_id = grade.id;
        csProps.closePopWin = closePopWin;
        csProps.isAdmin = isAdmin;
        popWin = Modal.info({
          title: '注册学生信息',
          iconType: 'edit',
          content: <CreatStudent {...csProps} />,
          okText: '关闭',
        });
      };
      const popContent = () => {
        if (cellData.people.length > 0) {
          return (
            <div>
              <p>姓名:{cellData.people[0].name}</p>
              <p>性别:{cellData.people[0].gender}</p>
              <p>qq:{cellData.people[0].qq}</p>
              <p>手机:{cellData.people[0].mobile}</p>
              <p>头像:<img style={{ width: '300px', 'max-height': '300px' }} src={cellData.people[0].avatars} alt="头像" /></p>
              <p>简介:{cellData.people[0].description}</p>
            </div>);
        } else {
          return (<p>暂时空缺</p>);
        }
      };
      // 修改
      const editorOne = () => {
        const p = cellData.people[0];
        message.info(p.name);
      };
      // 删除
      const delOne = () => {
        const p = cellData.people[0];
        message.error(`删除:${p.name}`);
        dispatch({
          type: 'student/deleteItem',
          payload: {
            id: p.id,
            grade_id: p.grade_id,
          },
        });
      };

      // 管理后台部分 编辑或者删除学生信息操作 按钮
      const MemOP = () => {
        if (isAdmin) {
          return (<div>
            <Button onClick={editorOne} size="small" icon="edit" type="primary" />
            <Popconfirm title="是否删除指定的信息" onConfirm={delOne} okText="确认" cancelText="取消">
              <Button size="small" icon="delete" type="danger" />
            </Popconfirm>
          </div>);
        } else {
          return (<div />);
        }
      };
      let cellText = ''; // 当前单元格显示的文本内容
      // 根据当前位置的信息渲染不同的标签内容
      if (cellData.people.length > 0) {
        let isFemale = false;
        cellData.people.forEach((p) => {
          cellText += `${p.name}`;
          if (p.gender === '女') {
            isFemale = true;
          }
        });
        if (isFemale) {
          return (<div className={styles['student-table-cell']}>
            <Popover content={popContent()}><p style={{ textAlign: 'center', cursor: 'pointer', backgroundColor: 'orangered', color: '#fff' }}>{cellText}</p></Popover>
            <MemOP />
          </div>);
        } else {
          return (<div className={styles['student-table-cell']}>
            <Popover content={popContent()}><p style={{ textAlign: 'center', cursor: 'pointer' }}>{cellText}</p></Popover>
            <MemOP />
          </div>);
        }
      } else {
        // cellText = '暂时没人'; // cellData.r_name + cellData.c_name;
        return (<Button style={{ width: '100%' }} icon="plus" onClick={tap} />);
      }
      // return (
      //   <p style={{ textAlign: 'center', cursor: 'pointer' }} onClick={tap}>{cellText}</p>
      // );
    };
    tableCols.push(temCol);
  });
  const OpCtrl = () => {
    if (isAdmin) {
      return (<div>
        <Button>修改班级信息</Button>
      </div>);
    } else {
      return (<div />);
    }
  };

  const copyHandle = () => {
    // console.log(e);
    message.success('链接复制成功', 3);
  };

  // console.log(tableCols);
  return (
    <div>
      <h4 style={{ textAlign: 'center' }}>{grade.name}</h4>
      <img style={{ display: 'block', margin: '0 auto', height: '200px' }} src={hb} alt={grade.name} />
      <OpCtrl />
      <Table
        rowKey="id" showHeader={false} pagination={false}
        bordered columns={tableCols} dataSource={table}
      />
      <CopyToClipboard text={`${siteUrl}#/student_reg?grade_id=${grade.id}`} onCopy={copyHandle}>
        <Tag color={'#2db7f5'} className={styles['btn-share']}>分享我的班级</Tag>
      </CopyToClipboard>
    </div>
  );
};

export default GradeStudent;
