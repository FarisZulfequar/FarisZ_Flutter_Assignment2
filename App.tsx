// Name: Faris Zulfequar
// ID: 991787502
// Github Repo: https://github.com/FarisZulfequar/FarisZ_Flutter_Assignment2

/* Commands Used
1. npx @react-native-community/cli@latest init Assignment2
2. npm starts
3. npm run android: Got errors saying it couldn't find the android SDK
4. Took note of the SDK path (/Users/fariszulfequar/Library/Android/sdk) and went to nano ~/.zshrc
5. Put the following lines into the file and source ~/.zshrc:
     export ANDROID_HOME=/Users/fariszulfequar/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools
6. /Users/fariszulfequar/Library/Android
7. put this into the local.properties file:
     sdk.dir=/Users/fariszulfequar/Library/Android/sdk
8. npm start, npm runs android
9. When getting to the navigation I installed:
     npm install @react-navigation/native
     npm install react-native-screens react-native-safe-area-context
     npm install @react-navigation/native-stack

*/

/* Documentation Used
1. https://reactnavigation.org/docs/native-stack-navigator/
2. https://react.dev/reference/react/useLayoutEffect
3. https://reactnavigation.org/docs/header-buttons/
4. https://react.dev/reference/react/useContext
5. https://react.dev/reference/react/createContext
* */

/* AI Used
Query: what is useContext and createContext, ReactNode, and how is it used in react native in TSX?
Answer: https://chatgpt.com/s/t_69b965f3820c8191bb1e006997ba5182

Query: what is the spread operator in tsx?
Answer: https://chatgpt.com/s/t_69b9689060dc8191bf35df8bb911e4f1
*/

import { GenerationPage } from './GenerationPage.tsx';
import { StatisticPage } from './StatisticPage.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NumberContainerProvider } from './NumberContainer.tsx';

export type NavigationList = {
  GenerationPage: undefined
  StatisticPage: undefined
}

const Stack = createNativeStackNavigator<NavigationList>();

export function App() {

  return (
    <NumberContainerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GenerationPage">
          <Stack.Screen
            name="GenerationPage"
            component={GenerationPage}
            options={{
              title: "Random Number Generator",
              headerStyle: {
                backgroundColor: "#7f5539"
              },
              headerTintColor: "white"
            }}
          />
          <Stack.Screen
            name="StatisticPage"
            component={StatisticPage}
            options={({}) => ({
              title: "Statistics",
              headerStyle: {
                backgroundColor: "#7f5539"
              },
              headerTintColor: "white"
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NumberContainerProvider>
  );
}

export default App;
