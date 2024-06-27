// src/screens/ListScreen.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useItems } from '../context/ItemsContext';

const ListScreen = ({ navigation }) => {
  const { items, fetchItems, deleteItem } = useItems();

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    await deleteItem(id);
  };

  const handleEdit = (item) => {
    navigation.navigate('AddItem', { item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <View style={styles.buttons}>
              <Button title="Edit" onPress={() => handleEdit(item)} />
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ListScreen;
