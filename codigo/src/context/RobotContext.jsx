import React, { createContext, useContext, useState } from 'react';

export const RobotContext = createContext({
  isRobotVisible: false,
  setIsRobotVisible: () => {},
});

export function RobotProvider({ children }) {
  const [isRobotVisible, setIsRobotVisible] = useState(false);

  return (
    <RobotContext.Provider value={{ isRobotVisible, setIsRobotVisible }}>
      {children}
    </RobotContext.Provider>
  );
}

export const useRobot = () => {
  const context = useContext(RobotContext);
  if (!context) {
    return { isRobotVisible: false, setIsRobotVisible: () => {} };
  }
  return context;
};