import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import createUser from '../../api/user';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      phoneNumber: null,
      displayName: null,
    };
  }

  componentDidMount() {
    // test.get().then(result => console.log(result));
  }

  render() {
    const {email, password, phoneNumber, displayName} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>email:</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.text}
          value={email}
          onChangeText={val => this.setState({email: val})}
        />
        <Text style={styles.title}>password:</Text>
        <TextInput
          secureTextEntry
          style={styles.text}
          value={password}
          onChangeText={val => this.setState({password: val})}
        />
        <Text style={styles.title}>phoneNumber:</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.text}
          value={phoneNumber}
          onChangeText={val => this.setState({phoneNumber: val})}
        />
        <Text style={styles.title}>displayName:</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.text}
          value={displayName}
          onChangeText={val => this.setState({displayName: val})}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            console.log(this.state);
            const usr = {
              email,
              phoneNumber,
              password,
              displayName,
            };
            createUser.post(usr);
          }}>
          <Text style={styles.title}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  text: {
    borderWidth: 1,
    borderColor: '#FFF',
    height: 45,
    width: '100%',
    paddingHorizontal: 10,
    color: '#FFF',
  },
  btn: {
    borderWidth: 1,
    borderColor: '#FFF',
    height: 45,
    width: '100%',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
