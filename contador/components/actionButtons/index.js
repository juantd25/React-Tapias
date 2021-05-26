import React, {Component, Fragment} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

class ActionButtons extends Component {
  handleReset() {}
  render() {
    const {reset, plus} = this.props;
    return (
      <Fragment>
        <TouchableOpacity style={styles.btnReset} onPress={reset}>
          <Text style={styles.btnTxt}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnReset} onPress={plus}>
          <Text style={styles.btnTxt}>+ 10</Text>
        </TouchableOpacity>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  btnTxt: {
    fontSize: 18,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  btnReset: {
    height: 50,
    width: 80,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});

export default ActionButtons;
