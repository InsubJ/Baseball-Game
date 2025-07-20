import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Image,
  TouchableOpacity
} from 'react-native';
import numGen from '../logic/numGen';
import {useLocalSearchParams} from 'expo-router';
import {useState, useEffect, useRef} from 'react';
import NavBar from './Navbar';
export default function playScreen() {
  const [pitches, setPitches] = useState('');
  const [score, setScore] = useState('0');
  const [balls, setBalls] = useState('0');
  const [strikes, setStrikes] = useState('0');
  const [sequence, setSequence] = useState('3');
  const [seq, setSeq] = useState(true)
  const [PA, setPA] = useState(false);
  const [guess1, setGuess1] = useState('')
  const [guess2, setGuess2] = useState('')
  const [guess3, setGuess3] = useState('')
  const [guess4, setGuess4] = useState('')
  const [strikeO, setStrikeO] = useState('none')
  const [practi, setPracti] = useState(false)
  const [status,setStatus]=useState(-1)
  const [time, setTime] = useState(1000)
  const [modal, setModal] = useState(true)
  const [timerC, setTimerC] = useState('white')
  const [history, setHistory] = useState<string[]>([])
  const [hA, setHA] = useState(false)

  
  const [countImage, setCountImage] = useState(require('../assets/images/3fin.png'))
  const params = useLocalSearchParams();
  let digits = params.digs as string; 
  let prac = Number(params.prac);

  const transformSeconds=()=>{
    const convertedValue= Math.floor((time / 1000));
    const formattedValue=(convertedValue)
    return formattedValue
  }

  const reset=()=>{
    setTime(1000)
    setTimerC('white')
  }
  const handleStart=()=>{
    setStatus(1)
  }
  const handlePause=()=>{
    setStatus(status===0?1:0)
  }
  const handleStop=()=>{
    setStatus(-1)
  }

  useEffect(()=>{
    var timerID = 0;
    if(status===1){
        timerID = setInterval(()=>{
          setTime((time) => time - 10);
        }, 10)
    } else {
        clearInterval(timerID)
        if(status===-1)
        reset();
    }
    return ()=>{clearInterval(timerID)}
  }, [status])

  useEffect(()=> {
    if (time <= 10000) {
      setTimerC('red')
    }
  },[time])

  const intervalRef = useRef(0);

  const interval = () => {
    intervalRef.current = setInterval(() => {
      setSequence((prevSequence) =>  parseInt(prevSequence) - 1 as string)
    }, 1000);
  };

  const intervalRef2 = useRef(0);
  const interval2 = () => {
    setStrikeO('block')
    intervalRef2.current = setInterval(() => {
      setStrikeO('none')
    }, 600);
  };

  useEffect(() => {
    if (strikeO === 'none') {
      clearInterval(intervalRef2.current)
    }
  }, [strikeO])

  useEffect(() => {
    if (prac === 1) {
      setPracti(true)
      setSeq(false)
      setModal(false)
      return
    }
    clearInterval(intervalRef2.current)
    interval();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (parseInt(sequence) === 3) {
      setCountImage(require('../assets/images/3fin.png'))
    }
    if (parseInt(sequence) === 2) {
      setCountImage(require('../assets/images/2fin.png'))
    }
    else if (parseInt(sequence) === 1) {
      clearInterval(intervalRef.current);
      setCountImage(require('../assets/images/3fin.png'))
      setTimeout(() => {
        setCountImage(require('../assets/images/3fin.png'))
        setSequence('GO!')
        setTimeout(() => {
          setSeq(false)
          setModal(false)
          setTimeout(() => {
            setStatus(1)
            setCountImage(require('../assets/images/3fin.png'))
          }, 1000)
        }, 1000)
      }, 1000)
    }
  }, [sequence]);


  useEffect(() => {
    if (time === 0) {
      setPA(true)
      setModal(true)
      setStatus(-1)
    }
  },[time])

  if (isNaN(parseInt(digits))) {
    digits = '3';
  }
  if (pitches === '') {
    setPitches(numGen(parseInt(digits)));
  }
  console.log(pitches)

  const checkHit = (): Object  => {
    var strike = 0;
    var ball = 0;
    var fullGuess = guess1 + guess2 + guess3 + guess4
    if (practi) {
      if (history.includes(fullGuess)) {
        setHA(true)
      }
      else {
        setHistory(
          [
            ...history, fullGuess
          ]
        )
      }
    }
    if (guess1 === pitches[0]) {
      strike++;
    }
    else {
      if (pitches.includes(guess1) && guess1.localeCompare('')) {
        console.log('hi')
        ball++;
      }
    }
    if (guess2 === pitches[1]) {
      strike++;
    }
    else {
      if (pitches.includes(guess2) && guess2.localeCompare('')) {
        ball++;
      }
    }
    if (guess3 === pitches[2]) {
      strike++;
    }
    else {
      if (pitches.includes(guess3) && guess3.localeCompare('')) {
        ball++;
      }
    }
    if (digits === '4') {
      if (guess4 === pitches[3]) {
        strike++;
      }
      else {
        if (pitches.includes(guess4) && guess4.localeCompare('')) {
          ball++;
        }
      }
    }
    return (
      {
        strike,
        ball
      }
    )
  }

  const bat = () => {
    var result = checkHit();
    setBalls(result.ball)
    setStrikes(result.strike)
    if (!digits.localeCompare(result.strike)) {
      // setPA(true)
      var currentScore = parseInt(score);
      setScore((currentScore + 1).toString())
      setPitches(numGen(parseInt(digits)))
      interval2()
      setBalls('0')
      setStrikes('0')
      resetGuess()
    }
  }
  
  const resetGuess = () => {
    setGuess1('')
    setGuess2('')
    setGuess3('')
    setGuess4('')
  }

  const playAgain = () => {
    setPA(false)
    setSeq(true)
    setSequence('3')
    interval();
    setModal(true)
    setPitches(numGen(parseInt(digits)))
    setBalls('0')
    setStrikes('0')
    resetGuess()
  }
  return (
    <View style={styles.container}>
      <NavBar
      />
      {modal ? (
        <View style={styles.outerM}>
        </View>
      ): null}
      <Modal
        visible={modal}
        transparent={true}
      >
        <View
          style={styles.modalView}
        >
          <View
            style={styles.innerM}
          >
            {seq ? (
              <Image
                style={{height: '80%', width: '60%'}}
                source={countImage}
              />
            ): null}
            {seq ? (
              <Text style={{fontSize: '40px'}}>
                {sequence}
              </Text>
            ): null}
            
            {PA ? (
              <View style={styles.innerM2}>
                <Text style={{fontSize: '50px'}}>
                  SCORE:
                </Text>
                <Text style={{fontSize: '60px'}}>
                  {score}
                </Text>
                <View style={{fontSize: '60px'}}>
                  <Button 
                    title='Play Again'
                    onPress={playAgain}
                  />
                </View>
              </View>
            ): null}
          </View>
        </View>
      </Modal>
      {hA ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 100,
            top: 70,
            height: '15%',
            width: '80%',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '20px',
          }}
          onPress={() => {
            setHA(false)
          }}
        >
          <Text style={{
            fontSize:'30px',
            color: 'red',
            textAlign: 'center'
          }}>
            You've already made this guess!
          </Text>
        </TouchableOpacity>
      ): null}
      <View 
        style={{
          position: 'absolute',
          zIndex: 100,
          top: 90,
          display: strikeO
        }}
      >
        <Text style={{fontSize: '50px', color: 'red'}}>
          STRIKEOUT!
        </Text>
      </View>
      <View
        style={styles.main}
      >
        {(!practi) ? (
          <Text style={{fontSize: '40px', color: timerC}}>
            {transformSeconds()}
          </Text>
        ): null}
        <Text
          style={{
            color: 'white',
            padding: '10%',
            fontSize: '30px',
          }}
        >
          Strikeouts: {score}
        </Text>
        <View style={styles.guesses}>
          <TextInput
            style={styles.input}
            value={guess1}
            onChangeText={setGuess1}
            onSubmitEditing={bat}
          />
          <TextInput
            style={styles.input}
            value={guess2}
            onChangeText={setGuess2}
            onSubmitEditing={bat}
          />
          <TextInput
            style={styles.input}
            value={guess3}
            onChangeText={setGuess3}
            onSubmitEditing={bat}
          />
          {(digits === '4') ? (
            <View>
              <TextInput
                style={styles.input}
                value={guess4}
                onChangeText={setGuess4}
                onSubmitEditing={bat}
              />
            </View>
          ): null}
        </View>
        <View>
          <Button
            title='bat'
            onPress={bat}
          />
        </View>
        <Text
          style={styles.otherT}
        >
          Strikes: {strikes}
        </Text>
        <Text
          style={styles.otherT}
        >
          Balls: {balls}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'center',
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
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  modalView: {
    margin: 0,
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    position: 'absolute',
    zIndex: -1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  innerM: {
    backgroundColor: 'white',
    height: '40%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  outerM: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    opacity: 40
  },
  strikeO: {
    position: 'absolute',
    zIndex: 100,
    top: 90,
  },
  innerM2: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  otherT: {
    color: 'white',
    fontSize: 20,
  }
});