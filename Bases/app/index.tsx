import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import {Link} from 'expo-router'

export default function playScreen() {
  const [digs, setDigs] = useState("")

  const handleClick = () => {
    if (isNaN(parseInt(digs))) {
      setDigs('3');
    }
  }

  return (
    <View style={styles.container}>
        <input
          type='text'
          value={digs}
          onChange={(e) => setDigs(e.target.value)}
        />
      <Link href={{pathname:'/play', params:{digs}}}>
       <button>Play</button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});