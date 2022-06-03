import React, { createContext, Dispatch, useState, ReactNode } from "react";

export type ChildrenType = {
  children: ReactNode;
};

export type ObjectType = {
  label: string;
  value: string;
  key?: string;
  disabled?: boolean;
};

export type InitialUserContextType = {
  allUsers: object;
  setAllUsers: Dispatch<React.SetStateAction<object>>;
  options: Array<ObjectType>;
  setOptions: Dispatch<React.SetStateAction<Array<ObjectType>>>;
};

export const UserContext = createContext<InitialUserContextType>(
  {} as InitialUserContextType
);

export const UserProvider = ({ children }: ChildrenType) => {
  const [allUsers, setAllUsers] = useState<object>({
    Sameer: ["Aayushi", "Kamalnath Sharma"],
    Aayushi: ["Bhaskar"],
    "Kamalnath Sharma": ["Shanti Kumar Saha"],
    "Shanti Kumar Saha": ["Bhaskar"],
    Bhaskar: [],
  });
  const [options, setOptions] = useState<Array<ObjectType>>([
    {
      label: "Sameer",
      value: "Sameer",
    },
    {
      label: "Aayushi",
      value: "Aayushi",
    },
    {
      label: "Bhaskar",
      value: "Bhaskar",
    },
    {
      label: "Kamalnath Sharma",
      value: "Kamalnath Sharma",
    },
    {
      label: "Shanti Kumar Saha",
      value: "Shanti Kumar Saha",
    },
  ]);
  return (
    <UserContext.Provider
      value={{ allUsers, setAllUsers, options, setOptions }}
    >
      {children}
    </UserContext.Provider>
  );
};
