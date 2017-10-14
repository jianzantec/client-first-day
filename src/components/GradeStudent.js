import React from 'react';
import { Table } from 'antd';
import { routerRedux } from 'dva/router';

const Example = ({ gsProps }) => {
  const { grade, cols, table } = gsProps.gradeInfo;
  const { dispatch } = gsProps;
  const tableCols = [];
  cols.forEach((item) => {
    const temCol = {};
    temCol.title = '';
    temCol.dataIndex = item.id;
    temCol.render = (txt, tItem) => {
      const cellData = tItem.info.find(d => d.c === item.id);  // 查找当前单元格需要显示的内容
      let cellText = ''; // 当前单元格显示的文本内容
      if (cellData.people.length > 0) {
        cellData.people.forEach((p) => {
          cellText += `${p.name}`;
        });
      } else {
        cellText = cellData.r_name + cellData.c_name;
      }
      const tap = () => {
        // alert(cellText);
        dispatch(routerRedux.push({
          pathname: '/student_reg',
          state: {
            grade_id: grade.id,
            row_id: cellData.r,
            col_id: cellData.c,
          },
        }));
      };
      return (<p style={{ textAlign: 'center', cursor: 'pointer' }} onClick={tap}>{cellText}</p>);
    };
    tableCols.push(temCol);
  });
  // console.log(tableCols);
  return (
    <div>
      <h4>{grade.name}</h4>
      <Table
        rowKey="id" showHeader={false}
        bordered columns={tableCols} dataSource={table}
      />
    </div>
  );
};

Example.propTypes = {
};

export default Example;
