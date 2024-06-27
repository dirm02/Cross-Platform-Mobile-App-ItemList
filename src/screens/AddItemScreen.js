// src/screens/AddItemScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useItems } from '../context/ItemsContext';

const AddItemScreen = ({ route, navigation }) => {
  const { addItem, editItem } = useItems();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (route.params && route.params.item) {
      const { item } = route.params;
      setName(item.name);
      setDescription(item.description);
      setId(item.id);
    }
  }, [route.params]);

  const handleAddItem = async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Validation Error', 'Name and description cannot be empty.');
      return;
    }

    const newItem = { id: uuidv4(), name, description };
    await addItem(newItem);
    navigation.goBack();
  };

  const handleEditItem = async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Validation Error', 'Name and description cannot be empty.');
      return;
    }

    const updatedItem = { id, name, description };
    await editItem(updatedItem);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button
        title={id ? "Edit Item" : "Add Item"}
        onPress={id ? handleEditItem : handleAddItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default AddItemScreen;
