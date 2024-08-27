import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [mealImage, setMealImage] = useState('');

  const addMeal = () => {
    if (mealName.trim() === '' || mealDescription.trim() === '' || mealImage.trim() === '') {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const newMeal = {
      id: Date.now().toString(),
      name: mealName,
      description: mealDescription,
      image: mealImage,
    };

    setMeals((prevMeals) => [...prevMeals, newMeal]);
    setMealName('');
    setMealDescription('');
    setMealImage('');
    
    Alert.alert('Nouveau repas ajouté', `Vous avez ajouté ${newMeal.name}`);
  };

  const deleteMeal = (id) => {
    const mealToDelete = meals.find(meal => meal.id === id);
    setMeals(meals.filter(meal => meal.id !== id));
    
    Alert.alert('Repas supprimé', `Vous avez supprimé ${mealToDelete.name}`);
  };

  const handleDragEnd = ({ data }) => {
    setMeals(data);
    
    Alert.alert('Repas déplacé', 'Vous avez réorganisé vos repas.');
  };

  const renderMeal = ({ item, drag }) => (
    <View style={styles.mealContainer}>
      <Image source={{ uri: item.image }} style={styles.mealImage} />
      <View style={styles.mealTextContainer}>
        <Text style={styles.mealName}>{item.name}</Text>
        <Text style={styles.mealDescription}>{item.description}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPressIn={drag} style={styles.icon}>
          <Icon name="arrows-alt-v" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteMeal(item.id)} style={styles.icon}>
          <Icon name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Nombre total de repas : {meals.length}</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nom du repas"
              value={mealName}
              onChangeText={setMealName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description du repas"
              value={mealDescription}
              onChangeText={setMealDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="URL de l'image"
              value={mealImage}
              onChangeText={setMealImage}
            />
            <Button title="Ajouter le repas" onPress={addMeal} />
          </View>
        </View>

        <View style={styles.listContainer}>
          <DraggableFlatList
            data={meals}
            renderItem={renderMeal}
            keyExtractor={(item) => item.id}
            onDragEnd={handleDragEnd}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  summaryContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  summaryText: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  listContainer: {
    flex: 1,
  },
  mealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  mealImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  mealTextContainer: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealDescription: {
    fontSize: 14,
    color: '#555',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,  // Espace entre les icônes
  },
});

export default App;