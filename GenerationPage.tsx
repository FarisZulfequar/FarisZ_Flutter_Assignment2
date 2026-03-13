import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';


export function GenerationPage() {
  const [number, setNumber] = useState(0);

  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 9) + 1;
    setNumber(randomNum);
  }

  return (
    <View style={generationPageStyles.container}>
      <View style={generationPageStyles.container2}>
        <Text style={generationPageStyles.textCenter}>{number === 0 ? '...' : number}</Text>
      </View>
      <View style={generationPageStyles.bottomButtons}>
        <TouchableOpacity style={generationPageStyles.button}>
          <Text style={generationPageStyles.btnText} onPress={generateRandomNumber}>Generate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={generationPageStyles.button}>
          <Text style={generationPageStyles.btnText}>View Statistics</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const generationPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#b08968',
  },

  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textCenter: {
    fontSize: 70,
    color: "white",
    fontWeight: "bold",
    marginTop : 100
  },

  bottomButtons: {
    flexDirection: 'row',
    gap : 10,
    paddingBottom : 25,
    paddingHorizontal :  25
  },

  button: {
    backgroundColor: '#7f5539',
    padding: 10,
    borderRadius: 5,
    width: "50%",
    height: "100%",
    alignItems: 'center',
  },

  btnText: {
    color: 'white',
    fontSize: 18,
  },
});