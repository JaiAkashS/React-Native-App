import { StyleSheet, TextInput, View } from 'react-native';
import React,{useState} from 'react'

export default function Search(){
    const [searchValue,setSearchValue] = useState('');
    return(
        <View>
            <TextInput style={styles.textinput} placeholder="Cloud Engineer" value={searchValue} onChangeText={setSearchValue} />
        </View>
    )
}


const styles = StyleSheet.create({
    textinput:{
        height:40,
        borderRadius:20 ,
        borderWidth:2,
        borderColor:'dark-grey',
        margin:20,
        padding:10,
        color:'grey'
    }
})