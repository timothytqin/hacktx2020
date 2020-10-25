import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';
import Theme from '../Theme'
const Data= [
		{
			id:"renter",
			title:"Donor",
		},
		{
			id:"donnor",
			title:"Receiver",
		},
	];
export default function ToggleButton() {

  const [selected, setSelected] = useState(-1);
  
  function select (index){
  	if(index===selected)
  		setSelected(-1)
  	else
  		setSelected(index)
  }
  
  
  return (
  	<SafeAreaView>
  		<FlatList style = {{width: "200%"}} contentContainerStyle={{flexDirection: "row"}} data={Data} renderItem = {({item, index})=> {
  			if (index === 0){
  			return(
  				<TouchableOpacity style={{left: 0,...styles.button, ...styles.pin, backgroundColor: index === selected ? Theme.colors.secondary : "white"}} onPress={()=>select(index)}>
              <Text style={{
     
                  ...styles.buttonText,
                  
                  fontSize: 20,
                }}>{item.title}
              </Text>
            </TouchableOpacity>	
  				);
  		}
  		else{
  			return(
  				<TouchableOpacity style={{right: -25, ...styles.button, ...styles.pin, backgroundColor: index === selected ? Theme.colors.secondary : "white"}} onPress={()=>select(index)}>
              <Text style={{
     
                  ...styles.buttonText,
                  
                  fontSize: 20,
                }}>{item.title}
              </Text>
            </TouchableOpacity>	
  				);
  		}

  		}}/>
 </SafeAreaView>);
}
const styles = StyleSheet.create({
  
  pin: {
    backgroundColor: Theme.colors.gray5,
    marginRight: 10,
    width: '100%',
    ...Theme.shadow,
  },
  button: {
    borderRadius: 25,
    padding: 10,
    width: '40%',
    marginVertical: 8,
    marginLeft: 'auto',
    ...Theme.shadow,
  },
  buttonText: {
    ...Theme.typography.bold,
    color: Theme.colors.gray1,
    fontSize: 14,
    textAlign: "center"
  },
});
