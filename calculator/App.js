import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {
  
  state = {
    resultText: '',
    calculationText: '',
    operations: ['DEL', '+', '-', '*', '/']
  }

  buttonPress = (text) => {
    
    if(text == '='){
      return this.validate() && this.calculateResult()
    }

    this.setState({
      resultText: this.state.resultText + text
    })
  }

  validate = () => {
    const text = this.state.resultText

    switch(text.slice(-1)){
      case '+': 
      case '-': 
      case '*': 
      case '/': 
        return false
    }
    return true
  }
    
  calculateResult = (text) => {
    const text = this.state.resultText
    this.setState({
      calculationText: eval(text)
    })
  }

  operate(operation){
    switch(operation){
      case 'DEL': 
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
          <TouchableOpacity key={nums[i][j]} style={styles.btn} onPress={() => this.buttonPress(nums[i][j])}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for (let i=0; i < 5; i++){
      ops.push(
        <TouchableOpacity key={this.operations[i]} style={styles.btn} onPress={() => this.operate(this.operation[i])}>
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  resultText: {
    fontSize: 30,
    color: 'black'
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculationText: {
    fontSize: 24,
    color: 'black'
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  btnText: {
    fontSize: 30,
    color: 'white'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343'
  },
  operations: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'space-around'
  },
  white: {
    color: 'white'
  }
});
