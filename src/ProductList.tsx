import React from "react";
import styled from "styled-components";

const Table = styled.table`
  margin-top: 15px;
  border-collapse: collapse;
  border: 1px solid #aaa;
  > th {
    vertical-align: baseline;
    padding: 5px 15px 5px 6px;
    background-color: #3f3f3f;
    border: 1px solid #3f3f3f;
    text-align: left;
    color: #fff;
  }
  > tr td {
    vertical-align: text-top;
    padding: 6px 15px 6px 6px;
    border: 1px solid #aaa;
  }
  & > tr:nth-child(odd) {
    background-color: #f5f5f5;
  }
  & > td:nth-child(even) {
    background-color: #fff;
  }
`;

export interface Item {
  id: string;
  name: string;
  describe: string;
  stock: number;
}

export interface Props {
  data: Item[];
  onClick: (item: {
    id: string;
    name: string;
    describe: string;
    stock: number;
  }) => void;
}

export default function ProductList(props: Props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
          <th>库存</th>
          <th>操作</th>
        </tr>
      </thead>
      {props.data &&
        props.data.map((item, index) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.describe}</td>
            <td>{item.stock}</td>
            <td>
              <button
                onClick={() => props.onClick(item)}
                disabled={item.stock <= 0}
              >
                加入购物车
              </button>
            </td>
          </tr>
        ))}
    </Table>
  );
}
