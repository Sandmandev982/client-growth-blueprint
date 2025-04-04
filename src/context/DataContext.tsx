
import React, { createContext, useContext, useState, ReactNode } from "react";
import { FormData, GeneratedOutput } from "../types";

interface DataContextType {
  formData: FormData | null;
  generatedOutput: GeneratedOutput | null;
  setFormData: (data: FormData) => void;
  setGeneratedOutput: (data: GeneratedOutput) => void;
  clearData: () => void;
  isDataGenerated: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [generatedOutput, setGeneratedOutput] = useState<GeneratedOutput | null>(null);
  
  const clearData = () => {
    setFormData(null);
    setGeneratedOutput(null);
  };
  
  const isDataGenerated = !!generatedOutput;

  return (
    <DataContext.Provider 
      value={{ 
        formData, 
        generatedOutput, 
        setFormData, 
        setGeneratedOutput, 
        clearData,
        isDataGenerated
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
