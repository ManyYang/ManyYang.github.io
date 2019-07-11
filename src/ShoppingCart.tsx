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
  currentStock: number;
}

export interface Props {
  data: Item[];
  selected: Item[];
  onAdd: (item: Item, stock: number) => void;
  onReduce: (item: Item, stock: number) => void;
  onRemove: (item: Item, stock: number) => void;
}

export default function ShoppingCart(props: Props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
          <th>件数</th>
          <th>操作</th>
        </tr>
      </thead>
      {props.selected &&
        props.selected.map((item, index) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.describe}</td>
            <td>
              <button
                onClick={() => props.onAdd(item, item.stock)}
                disabled={item.currentStock === 0}
              >
                +
              </button>
              {item.stock}
              <button
                onClick={() => props.onReduce(item, item.stock)}
                disabled={item.stock === 1}
              >
                -
              </button>
            </td>
            <td>
              <button onClick={() => props.onRemove(item, item.stock)}>
                移除
              </button>
            </td>
          </tr>
        ))}
    </Table>
  );
}
