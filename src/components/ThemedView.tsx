import React, { PropsWithChildren } from "react";
import { View, ViewProps, useColorScheme, StyleSheet } from "react-native";

type ThemedViewProps = PropsWithChildren<ViewProps> & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedView({
  children,
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? "light";

  const backgroundColor = colorScheme === "dark" ? darkColor ?? "#000" : lightColor ?? "#fff";

  return (
    <View style={[styles.container, { backgroundColor }, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
