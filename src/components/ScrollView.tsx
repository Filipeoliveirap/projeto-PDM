import React, { PropsWithChildren } from "react";
import { StyleSheet, useColorScheme, View, ScrollView as RNScrollView } from "react-native";
import ThemedView from "./ThemedView";

type Props = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ScrollView({ children, headerBackgroundColor }: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const childrenArray = React.Children.toArray(children);

  return (
    <ThemedView style={styles.container}>
      
      <View
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] },
        ]}
      >
        {childrenArray.length > 0 && childrenArray[0]}
      </View>

      <RNScrollView contentContainerStyle={styles.content}>
        {childrenArray.slice(1)}
      </RNScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 10, 
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: '#f5f5f5',
  },
});
