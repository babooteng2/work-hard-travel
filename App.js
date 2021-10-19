import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TextInput,
   ScrollView,
   Alert,
 } from "react-native";
import { theme } from "./colors"
import { Fontisto } from '@expo/vector-icons'; 

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({})
  useEffect(()=>{loadToDos()},[])
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload)
  const saveToDos = async (toSave) => {    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }
  const loadToDos = async () => {
    try{
      const s = await AsyncStorage.getItem(STORAGE_KEY)      
      setToDos( JSON.parse(s));
    }catch(e){
      console.log(e)
    }    
  }  
  const addToDo = async () => {
    if( text === "") return
    // save to do
    const newToDos = { 
      ...toDos,
      [Date.now()]:{text, working}
    }
    setToDos( newToDos );
    await saveToDos( newToDos );
    setText("")
  }
  const deleteToDo = (key) => {    
    Alert.alert(
     "Delete To Do",
     "Are you sure?",
     [
       {
         text:"Cancel",         
       },
       {
         text:"Confirm",
         onPress: async () => {           
          const newToDos = {...toDos}
          delete newToDos[key]
          setToDos( newToDos );
          await saveToDos( newToDos );
        },
      }
     ]
    )
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? theme.activate : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? theme.activate : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>      
      <TextInput
        value={text}
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        placeholder={working ? "What do you have to do?" : "Where do you wanna go?"}         
        returnKeyType="done"
        placeholderTextColor={theme.grey}
        style={styles.input}
      />
      <ScrollView>
        {
          Object.keys(toDos).map(key=> (
            toDos[key].working === working ?
            (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}> {toDos[key].text} </Text>
              <TouchableOpacity onPress={()=>deleteToDo(key)}>                
                <Fontisto name="trash" size={18} color="grey" />
              </TouchableOpacity>
            </View>
            ) : null
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {    
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    color: theme.activate,
    fontSize: 44,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,    
    fontSize: 20,
    color: theme.grey,
    marginVertical: 10,
    marginBottom: 20,
  },
  toDo: {    
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500"
  }
});
