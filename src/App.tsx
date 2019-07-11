import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ShoppingCart from "./ShoppingCart";
import axios from "axios";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  > table {
    margin: 0 10px;
  }
`;

function App() {
  const [data, setData] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    const initalData =
      localStorage.getItem("left") &&
      JSON.parse(localStorage.getItem("left") || "");
    const initalSelected =
      localStorage.getItem("right") &&
      JSON.parse(localStorage.getItem("right") || "");
    axios
      .get("/oa/cart")
      .then(data => setData(initalData ? initalData : data.data));
    setSelected(initalSelected);
  }, []);

  const onHandleClick = (item: {
    id: string;
    name: string;
    describe: string;
    stock: number;
  }) => {
    const index = data.findIndex((_: { id: string }) => _.id === item.id);
    if (index !== -1) {
      const newData = [
        ...data.slice(0, index),
        { ...item, stock: item.stock - 1 },
        ...data.slice(index + 1)
      ];
      setData(newData);

      localStorage.setItem("left", JSON.stringify(newData));
    }
    const fn =
      selected &&
      selected.some((_: { id: string }) => {
        if (_.id === item.id) {
          return true;
        }
      });
    if (fn) {
      const idx = selected.findIndex((_: { id: string }) => _.id === item.id);
      const i = selected.filter((_: { id: string }) => _.id === item.id);
      if (idx !== -1) {
        const newSelected = [
          ...selected.slice(0, idx),
          { ...item, stock: i[0].stock + 1, currentStock: item.stock - 1 },
          ...selected.slice(idx + 1)
        ];
        setSelected(newSelected);
        localStorage.setItem("right", JSON.stringify(newSelected));
      }
    } else {
      const newSelected = selected
        ? [...selected, { ...item, stock: 1, currentStock: item.stock - 1 }]
        : [{ ...item, stock: 1, currentStock: item.stock - 1 }];
      setSelected(newSelected);
      localStorage.setItem("right", JSON.stringify(newSelected));
    }
  };

  const onAdd = (
    item: { id: string; stock: number; currentStock: number },
    stock: number
  ) => {
    const index = data.findIndex((_: { id: string }) => _.id === item.id);
    const i = data.filter((_: { id: string }) => _.id === item.id);
    if (index !== -1) {
      const newData = [
        ...data.slice(0, index),
        { ...item, stock: i[0].stock - 1 },
        ...data.slice(index + 1)
      ];
      setData(newData);
      localStorage.setItem("left", JSON.stringify(newData));
    }
    const idx = selected.findIndex((_: { id: string }) => _.id === item.id);
    if (idx !== -1) {
      const newSelected = [
        ...selected.slice(0, idx),
        { ...item, stock: stock + 1, currentStock: item.currentStock - 1 },
        ...selected.slice(idx + 1)
      ];
      setSelected(newSelected);
      localStorage.setItem("right", JSON.stringify(newSelected));
    }
  };

  const onReduce = (
    item: { id: string; stock: number; currentStock: number },
    stock: number
  ) => {
    const index = data.findIndex((_: { id: string }) => _.id === item.id);
    const i = data.filter((_: { id: string }) => _.id === item.id);
    if (index !== -1) {
      const newData = [
        ...data.slice(0, index),
        { ...item, stock: i[0].stock + 1 },
        ...data.slice(index + 1)
      ];
      setData(newData);
      localStorage.setItem("left", JSON.stringify(newData));
    }
    const idx = selected.findIndex((_: { id: string }) => _.id === item.id);
    if (idx !== -1) {
      const newSelected = [
        ...selected.slice(0, idx),
        { ...item, stock: stock - 1, currentStock: item.currentStock + 1 },
        ...selected.slice(idx + 1)
      ];
      setSelected(newSelected);
      localStorage.setItem("right", JSON.stringify(newSelected));
    }
  };

  const onRemove = (item: { id: string }, stock: number) => {
    const index = data.findIndex((_: { id: string }) => _.id === item.id);
    const i = data.filter((_: { id: string }) => _.id === item.id);
    if (index !== -1) {
      const newData = [
        ...data.slice(0, index),
        { ...item, stock: i[0].stock + stock },
        ...data.slice(index + 1)
      ];
      setData(newData);
      localStorage.setItem("left", JSON.stringify(newData));
    }
    const idx = selected.findIndex((_: { id: string }) => _.id === item.id);
    if (idx !== -1) {
      const newSelected = [
        ...selected.slice(0, idx),
        ...selected.slice(idx + 1)
      ];
      setSelected(newSelected);
      localStorage.setItem("right", JSON.stringify(newSelected));
    }
  };

  return (
    <Box>
      商品列表
      <ProductList data={data} onClick={onHandleClick} />
      购物车
      <ShoppingCart
        data={data}
        selected={selected}
        onAdd={onAdd}
        onReduce={onReduce}
        onRemove={onRemove}
      />
    </Box>
  );
}

export default App;
