import { Text, TouchableOpacity, View } from 'react-native';
import { generationPageStyles } from './GenerationPage.tsx';


export function StatisticPage() {
  return (
    <View style={generationPageStyles.container}>
      <View style={generationPageStyles.bottomButtons}>
        <TouchableOpacity style={generationPageStyles.button}>
          <Text style={generationPageStyles.btnText}>Clear Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={generationPageStyles.button}>
          <Text style={generationPageStyles.btnText}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}