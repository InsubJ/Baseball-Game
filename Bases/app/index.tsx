import { View,
  StyleSheet,
  Image,
  Button,
  Text,
  CheckBox
} from 'react-native';
import { useState } from 'react';
import {useRouter} from 'expo-router'
import { Dropdown } from 'react-native-element-dropdown';
import NavBar from './Navbar';

export default function Index() {
  const [digs, setDigs] = useState(3)
  const router = useRouter();
  const [prac, setPrac] = useState(false)
  const [His, setHis] = useState(false)
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null)
    const data = [
    { label: 'Classic', value: 3 },
    { label: 'Expert', value: 4 },
    ];

    const handlePlay = () => {
      if (prac) {
        router.navigate({
        pathname: '/Play',
        params: { prac: 1 , digs }
        })
      }
      else {
        router.navigate({
        pathname: '/Play',
        params: { prac: 0 ,digs }
        })
      }
    }
  return (
    <View style={styles.container}>
      <NavBar></NavBar>
      <Image 
        style={{width: '70%', height: '40%'}}
        source={require('../assets/images/baseball.png')}
        alt='baseball player from https://imgbin.com'
      />
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Choose Level' : '...'}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={value}
        onChange={item => {
          setValue(item.value);
          setDigs(item.value);
        }}
      />
      <View>
        <CheckBox
          value={prac}
          onValueChange={setPrac}
          style={styles.checkbox}
        />
        <Text style={{color: 'white'}}>
          Practice Mode
        </Text>
      </View>
      <Button
        title='Play'
        onPress={ handlePlay}
      >
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  checkbox: {
    alignSelf: 'center',
  },
  dropdown: {
      margin: 16,
      height: '5%',
      width: '40%',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      backgroundColor: 'white',
  },
});