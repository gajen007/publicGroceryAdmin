import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// 1. Define the shape of a single option
interface SelectOption {
  id: string | number;
  optionName: string;
}

// 2. Define the Props for our component
interface CustomSelectProps {
  labelName: string;
  options: SelectOption[];
  onSelect: (item: SelectOption) => void;
  selectedItem?: SelectOption;
}

const MyPicker: React.FC<CustomSelectProps> = ({
  labelName,
  options,
  onSelect,
  selectedItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: SelectOption) => {
    onSelect(item);
    setIsOpen(false);
  };

  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 5,
    },
    selectBox: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 12,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      backgroundColor: "#fff",
    },
    dropdown: {
      zIndex: 1000,
      marginTop: 5,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      backgroundColor: "#466E2C",
      // Position absolute can be used if you want it to float over content
    },
    optionItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    optionText: {
      fontSize: 16,
      color: "#f3e308ff",
    },
    arrow: {
      fontSize: 12,
      color: "#666",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{labelName}</Text>

      {/* The "Select" Box */}
      <Pressable style={styles.selectBox} onPress={() => setIsOpen(!isOpen)}>
        <Text>
          {selectedItem ? selectedItem.optionName : "Select an option..."}
        </Text>
        <Text style={styles.arrow}>{isOpen ? "▲" : "▼"}</Text>
      </Pressable>

      {/* The Options List (Dropdown) */}
      {isOpen && (
        <View style={styles.dropdown}>
          {options.map((item) => (
            <Pressable
              key={item.id}
              style={styles.optionItem}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.optionText}>{item.optionName}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default MyPicker;
