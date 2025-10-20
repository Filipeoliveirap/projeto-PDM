import { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from "react-native-reanimated";

import ThemedView from "./ThemedView"

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
    headerImage?: ReactElement;
    headerBackgroundColor: { dark: string; light: string };
}>;

export default function ScrollView({ children, headerImage, headerBackgroundColor }: Props) {
    const colorScheme = useColorScheme() ?? "light";
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: interpolate(
                    scrollOffset.value,
                    [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                    [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                ),
            },
            {
                scale: interpolate(
                    scrollOffset.value,
                    [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                    [2, 1, 1]
                ),
            },
        ],
    }));

    const bgColor = colorScheme === "dark" ? headerBackgroundColor.dark : headerBackgroundColor.light;

    return (
        <ThemedView style={styles.container}>
            {headerImage && (
                <Animated.View style={[styles.header, { backgroundColor: bgColor }, headerAnimatedStyle]}>
                    {headerImage}
                </Animated.View>
            )}

            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} contentContainerStyle={styles.content}>
                {children}
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray",
    },
    header: {
        height: HEADER_HEIGHT,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: 16,
    },
});
