import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TouchableHighlight,
   TouchableWithoutFeedback,
   Pressable,
 } from "react-native";
import { theme } from "./colors"

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.9}>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableHighlight 
          underlayColor="#dddddd"
          activeOpacity={.5}
        >
        <Text style={styles.btnText}>Travel</Text>
        </TouchableHighlight>
        <TouchableWithoutFeedback>
        <Text style={styles.btnText}>Wow</Text>
        </TouchableWithoutFeedback>
        <Pressable onPress={()=>console.log("pressed")}>
        <Text style={styles.btnText}>Woww</Text>
        </Pressable>
      </View>
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
  }
});
