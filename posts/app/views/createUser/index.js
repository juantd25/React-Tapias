import axios from 'axios';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: null,
      Password: null,
      Phone: null,
    };
  }

  componentDidMount() {
    const _path = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=200';
    const _pathInst = 'https://pokeapi.co/api/v2/';
    const _headers = {
      'Content-Type': 'application/json',
    };

    axios.get(_path).then(result => console.log(result.data));

    axios({method: 'get', headers: _headers, url: _path}).then(result =>
      console.log(result.data),
    );

    const instAxios = axios.create({baseURL: _pathInst, headers: _headers});

    instAxios({
      method: 'get',
      url: 'pokemon?limit=100&offset=200',
    }).then(result => console.log(result.data.results));
  }

  render() {
    const {Email, Password, Phone} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.text}
          value={Email}
          onChangeText={val => this.setState({Email: val})}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          secureTextEntry
          style={styles.text}
          value={Password}
          onChangeText={val => this.setState({Password: val})}
        />
        <Text style={styles.title}>Phone:</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.text}
          value={Phone}
          onChangeText={val => this.setState({Phone: val})}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => console.log(this.state)}>
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
