import React, { createContext, useState, useContext } from "react";

// Define the context type
interface Vegetable {
    id: number;
    name: string;
    price: number;
    image: any;
}

interface VegetableContextType {
    vegetables: Vegetable[];
    updateVegetablePrice: (id: number, newPrice: number) => void;
}

// Create the context
const VegetableContext = createContext<VegetableContextType | undefined>(undefined);

// Provide initial vegetables data
const initialVegetables: Vegetable[] = [
    { id: 1, name: "Tomato", price: 2, image: require("../../assets/images/Tomato_je.jpg") },
    { id: 2, name: "Potato", price: 15, image: require("../../assets/images/potato.jpg") },
    { id: 3, name: "Carrot", price: 3, image: require("../../assets/images/carrot.jpg") },
    { id: 4, name: "Cabbage", price: 18, image: require("../../assets/images/cabage.jpg") },
    { id: 5, name: "Onion", price: 22, image: require("../../assets/images/onion.jpg") },
    { id: 6, name: "Broccoli", price: 35, image: require("../../assets/images/Broccoli_and_cross_section_edit.jpg") },
    { id: 7, name: "Spinach", price: 20, image: require("../../assets/images/spinach.jpg") },
    { id: 8, name: "Cucumber", price: 16, image: require("../../assets/images/cucumber.jpg") },
    { id: 9, name: "Peppers", price: 4, image: require("../../assets/images/pepper.jpg") },
    { id: 10, name: "Lettuce", price: 25, image: require("../../assets/images/lettuce.jpg") },
];

// Context provider
export const VegetableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [vegetables, setVegetables] = useState<Vegetable[]>(initialVegetables);

    const updateVegetablePrice = (id: number, newPrice: number) => {
        setVegetables((prev) =>
        prev.map((veg) => (veg.id === id ? { ...veg, price: newPrice } : veg))
        );
    };

    return (
        <VegetableContext.Provider value={{ vegetables, updateVegetablePrice }}>
        {children}
        </VegetableContext.Provider>
    );
};

// Custom hook to use the context
export const useVegetableContext = () => {
    const context = useContext(VegetableContext);
    if (!context) {
        throw new Error("useVegetableContext must be used within a VegetableProvider");
    }
    return context;
};
