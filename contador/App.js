/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import ActionButtons from './components/actionButtons';
import CustomButton from './components/button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      flag: false,
    };

    console.log('constructor 1');

    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
  }

  // se puede usar para controlar los render de la app solo cuando realmente hay cambios de datos pure component
  shouldComponentUpdate(nextProps, nextState) {
    const {counter} = this.state;
    if (nextState.counter === counter) return false;
    else return true;
  }

  UNSAFE_componentWillMount() {
    console.log('componentWillMount despues del constructor 2');
  }

  componentDidMount() {
    this.setState({counter: 10});
    console.log('componentDidMount despues del render 4');
  }

  handleUp() {
    const {counter: ct} = this.state;
    this.setState({counter: ct + 1});
  }

  handleDown() {
    const {counter: ct} = this.state;
    this.setState({counter: ct - 1});
  }

  handleReset() {
    this.setState({counter: 0});
  }

  handlePlus() {
    const {counter: ct} = this.state;
    this.setState({counter: ct + 10});
  }

  render() {
    const {counter, flag} = this.state;
    if (flag)
      return (
        <View>
          <Text>Vacio</Text>
        </View>
      );

    // this.setState llama al render por lo tanto no se llamar dentro del render
    return (
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <CustomButton label="-" action={this.handleDown} />
          <View style={styles.counterContainer}>
            <Text style={styles.counter}>{counter}</Text>
          </View>
          <CustomButton label="+" action={this.handleUp} />
        </View>
        <View style={styles.subcontainerReset}>
          <ActionButtons reset={this.handleReset} plus={this.handlePlus} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
  },
  subcontainer: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  subcontainerReset: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  btnTxt: {
    fontSize: 18,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  btnReset: {
    height: 50,
    width: '50%',
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default App;
