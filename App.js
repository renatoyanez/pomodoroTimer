import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

const format = num => `0${num}`.slice(-2);

const remaining = (time) => {
    const min = Math.floor(time / 60);
    const sec = time - min * 60;
    return { min: format(min), sec: format(sec) };
}

export default function App() {
  const [remainingsec, setRemainingsec] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { min, sec } = remaining(remainingsec);

  toggle = () => {
    setIsActive(!isActive);
  }

  reset = () => {
    setRemainingsec(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingsec(remainingsec => remainingsec + 1);
      }, 1000);
    } else if (!isActive && remainingsec !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingsec]);


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.timerText}>{`${min}:${sec}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button}>
          <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={[styles.button, styles.buttonReset]}>
          <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      borderWidth: 1,
      borderColor: 'blue',
      borderRadius: 360,
      width: '30%',
      height: '18%',
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      fontSize: 35,
      color: 'blue'
  },
  timerText: {
      color: 'white',
      fontSize: 90,
      marginBottom: 20
  },
  buttonReset: {
      marginTop: 30,
      borderColor: "green"
  },
  buttonTextReset: {
    color: "green"
  }
});