import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Image, TouchableOpacity,Text,FlatList} from 'react-native';
import React, { useState } from 'react';
import Table from './components/Table';


export default function App() {
  const [searchval, setSearchVal] = useState("");
  
  const data = [{id:1,title:"Hello"},
    {id:2,title:"World"},
    {id:3,title:"Web"},
    {id:4,title:"Web"},
    {id:5,title:"Web"},
    {id:6,title:"Web"},
    {id:7,title:"Web"},
    {id:8,title:"Web"},
    {id:9,title:"Web"},
    {id:10,title:"Web"},
    {id:11,title:"Web"},
    {id:12,title:"Web"},  
    {id:13,title:"Web"},  
    {id:14,title:"Web"},  
    {id:15,title:"Web"},  
    {id:16,title:"Web"},  
  ]

  return (
    <View style={styles.container}>
      
      {/* <Image 
        style={styles.imagesize} 
        source={require('./assets/google-logo.webp')} 
      />
      <View style={{flexDirection:'row'}}>

      <TextInput 
        style={styles.textinput} 
        value={searchval} 
        onChangeText={setSearchVal}
        placeholder="Search..."
        />

      <TouchableOpacity style={styles.buttonstyle} onPress={()=>{setSearchVal('')}}>
        <Text>Search</Text>
      </TouchableOpacity>

      </View> */}
      <View style={{ flex: 1,alignContent:'center',width:'100%'}}>
        <Table data={data} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60
  },
  textinput: {
    height: 40,
    width: '90%',
    maxWidth:500,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  imagesize: {
  width: '80%',
  height: 100,          
  resizeMode: 'contain',
  marginVertical: 40
  },
  buttonstyle: {
  height: 40,
  paddingHorizontal: 15,
  backgroundColor: '#4285F4',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center'
},
buttonText: {
  color: '#fff',
  fontSize: 14
}
});