import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import numGen from '../logic/numGen';
import {useLocalSearchParams} from 'expo-router';
import { ReactElement, useState, FocusEvent} from 'react';
import { useForm, Controller } from 'react-hook-form'
export default function playScreen() {
  const [pitches, setPitches] = useState('');
  const [score, setScore] = useState('0');
  const [balls, setBalls] = useState('0');
  const [strikes, setStrikes] = useState('0');
  const [hits, setHits] = useState('0');
  const [PA, setPA] = useState(false);
  const [inputArray, setInputArray] = useState<string[]>([])
  const params = useLocalSearchParams();
  type FormFields = {
    input: string
  }

  const updateInputs = (event: FocusEvent<HTMLInputElement>) => {
    inputArray.push(event.nativeEvent.text)
  }

  const inputs = (digs:string): ReactElement | null => { 
    const form = useForm();
    let h = []
    for (let i=0; i < parseInt(digs); i++) {
      h.push(
        <View>
          <TextInput
            label="Name"
            style={styles.input}
            onBlur={updateInputs}
            onSubmitEditing={() => (console.log('this'))}
          />
        </View>
      )
    }
    h.push(
      <>
      {PA ? (
        <View>
          <Button 
            title='Play Again'
            onPress={playAgain}
          />
        </View>
      ): null}
      </>
    )
    return (
      <View>
          {h}
      </View>
    )
  }

  const checkHit = (pitches: string, dig: string, p: number): number => {
    if (pitches[p] === dig) {
      return 1;
    }
    else if (pitches.includes(dig) && dig!== '') {
      return 0;
    }
    else {
      return -1
    }
  }

  const bat = () => {
    var winCon = 1;
    var strike = 0;
    var ball = 0;
    var hit = 0;
    for (let i=0; i < parseInt(digits); i++) {
      if (checkHit(pitches, inputArray[i], i) === 1) {
        hit += 1;
      }
      else if (checkHit(pitches, inputArray[i], i) === 0) {
        ball += 1;
        winCon *= 0;
      }
      else {
        strike += 1;
        winCon *= 0;
      }
    }
    let iA: string[] = []
    setInputArray(iA)
    setHits(hit.toString())
    setBalls(ball.toString())
    setStrikes(strike.toString())
    if (winCon) {
      setPA(true)
      var currentScore = parseInt(score);
      setScore((currentScore + 1).toString())
    }
  }

  const playAgain = () => {
    setPA(false)
    setPitches(numGen(parseInt(digits)))
    setHits('0')
    setBalls('0')
    setStrikes('0')
  }

  let digits = params.digs as string;  
  if (isNaN(parseInt(digits))) {
    digits = '3';
  }
  if (pitches === '') {
    setPitches(numGen(parseInt(digits)));
  }
  console.log(pitches)
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>
        Wins: {score}
      </Text>
      <Text style={styles.guesses}>
        {inputs(digits)}
      </Text>
      <Button onPress={bat} title='bat'/>
      <Text style={{color: 'white'}}>
        Hits: {hits}
      </Text>
      <Text style={{color: 'white'}}>
        Strikes: {strikes}
      </Text>
      <Text style={{color: 'white'}}>
        Balls: {balls}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    color: '#fff',
  },
    button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  guesses: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});