// src/context/ItemsContext.js
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const storedItems = await AsyncStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  };

  const addItem = async (newItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const editItem = async (updatedItem) => {
    const updatedItems = items.map(item => item.id === updatedItem.id ? updatedItem : item);
    setItems(updatedItems);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const deleteItem = async (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  };

  return (
    <ItemsContext.Provider value={{ items, setItems, fetchItems, addItem, editItem, deleteItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);
