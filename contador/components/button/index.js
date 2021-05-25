import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class ButtonCustom extends Component {
  constructor(props) {
    super(props);

    console.log('contructor hijo primero en el ciclo de vida');
  }

  componentWillMount() {
    console.log('hijo componentWillMount is deprecated use componentDidMount');
  }

  componentWillReceiveProps() {
    console.log(
      'hijo componentWillReceiveProps is deprecated use getDerivedStateFromProps',
    );
  }

  static getDerivedStateFromProps() {
    console.log('getDerivedStateFromProps'.toUpperCase());
  }

  componentWillUpdate() {
    console.log(
      'componentWillUpdate is deprecated use getSnapshotBeforeUpdate',
    );
  }

  // Se ejecuta cuando se va a actualizar el componente
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    console.log(
      'Hijo shouldComponentUpdate se ejecuta justo antes de ejecutar cambios y muestra los cambios que se van a hacer al state',
    );
    return true;
  }

  // componentWillUpdate is deprecated
  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate se ejecuta al realizar el cambio');
    return true;
  }

  componentDidUpdate(prevProps, prevStates) {
    console.log(prevProps, prevStates);
    console.log(
      'se ejecuta despues de la actualización del state mostrando la información que tenia el state antes del update',
    );
  }

  componentWillUnmount() {
    this.setState({});
    console.log(
      'al desmontar componente uso resetear el state ultimo en el ciclo de vida',
    );
  }

  render() {
    const {label, action} = this.props;

    return (
      <TouchableOpacity style={styles.btn} onPress={action}>
        <Text style={styles.btnTxt}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

// function ButtonCustom(props) {
//   const {label, action} = props;
//   return (
//     <TouchableOpacity style={styles.btn} onPress={action}>
//       <Text style={styles.btnTxt}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

ButtonCustom.defaultProps = {
  label: 'Button',
  action: () => null,
};

ButtonCustom.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func,
};

const styles = StyleSheet.create({
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
});

export default ButtonCustom;
