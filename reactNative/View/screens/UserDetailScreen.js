import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import firebase from '../../database/firebase';

const UserDetailScreen = (props) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection('users').doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const deleteUser = async () => {
    const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate('UsersList');
  };

  const updateUser = async () => {
    const dbRef = firebase.db.collection('users').doc(user.id);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setUser({});
    props.navigation.navigate('UsersList');
  };

  const openConfirmationAlert = () => {
    Alert.alert('Remove User', 'Are you sure', [
      { text: 'Yes', onPress: () => deleteUser() },
      { text: 'No', onPress: () => console.log(false) },
    ]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.name}
          keyboardType="default"
          placeholder="Name User"
          onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.email}
          keyboardType="email-address"
          placeholder="Email User"
          onChangeText={(value) => handleChangeText('email', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.phone}
          keyboardType="phone-pad"
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText('phone', value)}
        />
      </View>
      <View>
        <Button color="#19AC52" title="Update User" onPress={() => updateUser()} />
        <Button color="#E37399" title="Delete User" onPress={() => openConfirmationAlert()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default UserDetailScreen;
