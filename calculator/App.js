import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {
  
  state = {
    resultText: '',
    calculationText: '',
    operations: ['D', '+', '-', '*', '/']
  }

  buttonPress = (text) => {
    
    if(text == '='){
      return this.calculateResult(this.state.resultText)
    }

    this.setState({
      resultText: this.state.resultText + text
    })
  }

  calculateResult = (text) => {
    const text = this.state.resultText
    this.setState({
      calculationText: eval(text)
    })
  }

  operate(operation){
    switch(operation){
      case 'D': 
        const text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop()

        if (this.operations.indexOf(lastChar) > 0) return
        if (this.state.text === '') return

        this.setState({
          resultText: this.state.resultText + operation
        })
    }
  }
  
  render() {

    let rows = []
    let nums = [[1,2,3], [4,5,6], [7,8,9], ['.',0,'=']]
    for(let i=0; i<4; i++){
      let row = []
      for (let j=0; j<3; j++){
        row.push(
          <TouchableOpacity style={styles.btn} onPress={() => this.buttonPress(nums[i][j])}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }

    let ops = []
    for (let i=0; i < 5; i++){
      ops.push(
        <TouchableOpacity style={styles.btn} onPress={() => this.operate(this.operation[i])}>
          <Text style={[styles.btnText, styles.white]}>{this.operations[i]}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.CalculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result: {
    flex: 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  resultText: {
    fontSize: 30,
    color: 'white'
  },
  calculation: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculationText: {
    fontSize: 24,
    color: 'white'
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  btnText: {
    fontSize: 30,
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: 'yellow'
  },
  operations: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-around'
  },
  white: {
    color: 'white'
  }
});
