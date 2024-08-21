import { Text, type TextProps, StyleSheet } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    color: "#022659",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
    color: "#022659",
  },
  defaultSemiBold: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
    color: "#f20a38",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 450,
    lineHeight: 30,
    color: "#022659",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
