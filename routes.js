"use strict";

//require the Express module
const express = require("express");

//creates a new router object
const routes = express.Router();

const cartItems = [
  { id: 1, product: "Book", price: 15, quanity: 5 },
  { id: 2, product: "Americano", price: 7, quanity: 4 },
  { id: 3, product: "Sweater", price: 20, quanity: 1 },
  { id: 4, product: "Viynl", price: 25, quanity: 1 },
];
let nextId = 5;

routes.get("/cart-items", (req, res) => {
  let maxPrice = req.query.maxPrice;
  let prefix = req.query.prefix;
  let pageSize = req.query.pageSize;
  let filteredCartItems = cartItems;
  if (maxPrice) {
    filteredCartItems = filteredCartItems.filter((item) => {
      return item.price <= maxPrice;
    });
  }
  if (prefix) {
    filteredCartItems = filteredCartItems.filter((item) => {
      return item.product.toLowerCase().includes(prefix.toLowerCase().trim());
    });
  }
  if (pageSize) {
    filteredCartItems = filteredCartItems.slice(0, pageSize);
  }
  res.json(filteredCartItems);
});

routes.get("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let foundItem = cartItems.find((item) => {
    res.status(200);
    return item.id === id;
  });
  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404);
    res.send(`ID Not Found`);
  }
});

routes.post("/cart-items", (req, res) => {
  let cartItem = req.body;
  cartItem.id = nextId++;
  cartItems.push(cartItem);
  res.status(201);
  res.json(cartItem);
});

routes.put("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let updatedItem = req.body;
  updatedItem.id = id;
  let index = cartItems.findIndex((item) => {
    res.status(200);
    return item.id === id;
  });
  cartItems[index] = updatedItem;
  res.json(updatedItem);
});

routes.delete("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = cartItems.findIndex((item) => {
    return item.id === id;
  });
  cartItems.splice(index, 1);
  res.sendStatus(204);
});

//exports routes
module.exports = routes;
