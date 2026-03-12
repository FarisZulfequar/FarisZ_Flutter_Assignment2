import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export function GenerationPage() {
  return (
    <View style={generationPageStyles.container}>
      <View style={generationPageStyles.bottomButtons}>
        <TouchableOpacity style={generationPageStyles.button}>
          <Text style={generationPageStyles.btnText}>Generate</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b08968",
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