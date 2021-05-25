import React, {Component} from 'react';

class ActionButtons extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.btnReset} onPress={this.handleReset}>
        <Text style={styles.btnTxt}>Reset</Text>
      </TouchableOpacity>
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
    width: '50%',
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActionButtons;
