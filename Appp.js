import React, { Component } from 'react';
import { View } from 'react-native';
import Prototype from './src/screens/Prototype'

class Appp extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
       <Prototype/>
      </View>
    );
  }
}

export default Appp;