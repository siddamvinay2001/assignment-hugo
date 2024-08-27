import React, { useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

interface CustomInputBoxProps {
  value: string[];
  onChange: (index: number, value: string) => void;
  error?: string;
  style?: ViewStyle;
}

const CustomInputBox: React.FC<CustomInputBoxProps> = ({
  value,
  onChange,
  error,
  style,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (index: number, text: string) => {
    onChange(index, text);
    if (text.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, value.length);
  }, [value.length]);

  return (
    <View style={[styles.container, style]}>
      {value.map((val, index) => (
        <View key={index} style={styles.inputWrapper}>
          <TextInput
            value={val}
            onChangeText={(text) => handleChange(index, text)}
            keyboardType="numeric"
            maxLength={1}
            style={[styles.input, error && styles.errorInput]}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            blurOnSubmit={false}
            returnKeyType={index < value.length - 1 ? "next" : "done"}
          />
        </View>
      ))}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  inputWrapper: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "white",
  },
  errorInput: {
    borderColor: "#eb2917",
  },
  errorText: {
    color: "#eb2917",
    marginTop: 5,
    fontSize: 14,
  },
});

export default CustomInputBox;
