
import {Text , View ,StyleSheet,Image} from 'react-native'


export default function HelloWorld(){
    return(
        <View style={{flexDirection:'row' , gap:20}}>
            <Text style={styles.text}>This is from the Hello World Functional Component</Text>
            <Image style={styles.image} source={require('../assets/level 12.png')} />
            <Image style={styles.image} source={{uri:''}} />
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        color:'blue',
        backgroundColor:'yellow'
    },
    image:{
        height:45,
        width:45
    }
})