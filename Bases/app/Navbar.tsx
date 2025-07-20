import { ReactHTMLElement } from 'react';
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
import {useRouter} from 'expo-router'
const router = useRouter();


export default function NavBar() {
    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                onPress={() => {
                    router.navigate({pathname: '/'})
                }}
                style={styles.tabs}
            >Home
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'fixed',
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 10,
        backgroundColor: 'white',
    },
    tabs: {
        backgroundColor: 'grey',
        padding: 10,
    }
})