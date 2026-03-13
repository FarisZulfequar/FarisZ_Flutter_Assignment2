import React, {createContext, ReactNode, useState} from "react";

interface NumberContainerType {
  numberMap: Record<number, number>;
  resetNumberList: () => void;
  increaseGeneratedNumberTimes: (generatedNum: number) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const NumberContainer = createContext<NumberContainerType>({
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
      ...prev,
      [num]: (prev[num] || 0) + 1
    }));
  };

  return (
    <NumberContainer.Provider
      value={{ numberMap, resetNumberList, increaseGeneratedNumberTimes }}
    >
      {children}
    </NumberContainer.Provider>
  );

}