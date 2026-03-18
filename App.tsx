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


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// -------------------------------
// App React File
// -------------------------------
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

// -------------------------------
// Generation React Page
// -------------------------------

type navigationProp = NativeStackScreenProps<NavigationList, 'GenerationPage'>;

export function GenerationPage({navigation} : navigationProp) {
  const [number, setNumber] = useState(0);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [isIncrementNumber, setIsIncrementNumber] = useState(false);
  const { increaseGeneratedNumberTimes } = useContext(NumberContainer);

  useEffect(() => {
    if (currentIteration === 0) {
      if (isIncrementNumber) {
        increaseGeneratedNumberTimes(number);
        setIsIncrementNumber(false);
      }
    }
  }, [currentIteration, increaseGeneratedNumberTimes, isIncrementNumber, number])

  const generateRandomNumber = () => {
    // Creates a random number and sets it to the number UI to display
    const randomNum = Math.floor(Math.random() * 9) + 1;
    setNumber(randomNum);

    setTimeout(() => {
      setCurrentIteration(prev => {
        // If the previous number/iteration is under 6,
        // it will loop and execute the entire function again and return to this
        if (prev < 6) {
          generateRandomNumber();
          return prev + 1;
        }
        else {
          setIsIncrementNumber(true);
          return 0
        }
      });
    }, 80);
  };

  useFocusEffect(
    useCallback(() => {
      setNumber(0);
    }, [])
  );

  return (
    <View style={generationPageStyles.container}>
      <View style={generationPageStyles.container2}>
        <Text style={generationPageStyles.textCenter}>{number === 0 ? '...' : number}</Text>
      </View>
      <View style={generationPageStyles.bottomButtons}>
        <TouchableOpacity style={generationPageStyles.button} onPress={() => generateRandomNumber()}>
          <Text style={generationPageStyles.btnText}>Generate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={generationPageStyles.button} onPress={() => navigation.navigate('StatisticPage')}>
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

  leftArrowBtn : {
    color: 'white',
    fontSize: 25,
    fontFamily: 'System',
    marginRight : 10
  }
});

// -------------------------------
// Statistics React Page
// -------------------------------

type navigationProp2 = NativeStackScreenProps<NavigationList, 'StatisticPage'>;

export function StatisticPage({navigation}: navigationProp2) {
  const { numberMap, resetNumberList } = useContext(NumberContainer);

  // Makes the upper title of the screen white and have an arrow on the left
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={generationPageStyles.leftArrowBtn}>←</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (

    <View style={generationPageStyles.container}>
      <View style={[ generationPageStyles.container2, generationPageStyles.bottomButtons]}>
        <FlatList
          data={Object.keys(numberMap ?? {})}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={[generationPageStyles.container2, generationPageStyles.bottomButtons]}>
              <Text style={generationPageStyles.btnText}>Number {item}:</Text>
              <Text style={generationPageStyles.btnText}>{numberMap[Number(item)]} times</Text>
            </View>
          )}
        />
      </View>
      <View style={generationPageStyles.bottomButtons}>
        <TouchableOpacity style={generationPageStyles.button} onPress={resetNumberList}>
          <Text style={generationPageStyles.btnText}>Clear Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={generationPageStyles.button} onPress={() => navigation.goBack()}>
          <Text style={generationPageStyles.btnText}>Back Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

// -------------------------------
// NumberContainer Class
// -------------------------------

interface NumberContainerType {
  numberMap: Record<number, number>;
  resetNumberList: () => void;
  increaseGeneratedNumberTimes: (generatedNum: number) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const NumberContainer = createContext<NumberContainerType>({
  // It gives each function a default value, in this case the functions are empty
  numberMap: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0},
  resetNumberList: () => {},
  increaseGeneratedNumberTimes: () => {}
});

export const NumberContainerProvider = ({children}: ProviderProps) => {
  const [numberMap, setNumberMap] = useState<Record<number, number>>({
    1: 0, 2: 0, 3: 0,
    4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0,
  });

  const resetNumberList = () => {
    setNumberMap({
      1: 0, 2: 0, 3: 0,
      4: 0, 5: 0, 6: 0,
      7: 0, 8: 0, 9: 0,
    });
  };

  const increaseGeneratedNumberTimes = (num : number) => {
    setNumberMap(prev => ({
      // Retrieves and copies all the values from the previous numberMap
      // and sets adds 1 to the number generated to itself
      ...prev,
      [num]: (prev[num] || 0) + 1
    }));
  };

  return (
    // Provides all data (functions and variables) to the app, and everything wrapped inside, is a child
    <NumberContainer.Provider
      value={{ numberMap, resetNumberList, increaseGeneratedNumberTimes }}
    >
      {children}
    </NumberContainer.Provider>
  );

}

export default App;
