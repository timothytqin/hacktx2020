import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';

const Data= [
		{
			id:"renter",
			title:"button 1",
		},
		{
			id:"donnor",
			title:"button 2",
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
  		<FlatList data={Data} renderItem = {({item, index})=> {
  			return(
  				<TouchableOpacity onPress={()=>select(index)}>
  					<Text style ={{flex:1,alignItems:"center", justifyContent:"center"}}>{item.title}</Text>
  				</TouchableOpacity>	
  				);
  		}}/>
 </SafeAreaView>);
}
