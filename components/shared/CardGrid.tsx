import {ReactNode, Children} from "react";
import {View, useWindowDimensions, StyleSheet} from "react-native";

const BREAKPOINT_MD = 768;
const BREAKPOINT_LG = 1024;

type CardGridProps = {
    children: ReactNode;
    maxColumns?: 2 | 3;
};

function getColumnCount(width: number, maxColumns: number): number {
    if (width >= BREAKPOINT_LG) return maxColumns;
    if (width >= BREAKPOINT_MD) return 2;
    return 1;
}

export default function CardGrid({children, maxColumns = 2}: CardGridProps) {
    const {width} = useWindowDimensions();
    const columns = getColumnCount(width, maxColumns);

    if (columns === 1) {
        return <>{children}</>;
    }

    const childArray = Children.toArray(children);
    const cellWidth = `${100 / columns}%` as const;

    return (
        <View style={styles.grid}>
            {childArray.map((child, index) => (
                <View key={index} style={[styles.cell, {width: cellWidth}]}>
                    {child}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'stretch',
    },
    cell: {
        flexShrink: 0,
    },
});
