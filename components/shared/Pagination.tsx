import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';
import ThemedButton from "@/components/themed/ThemedButton";
import useTheme from "@/hooks/useTheme";
import { Entypo } from "@expo/vector-icons";
import SetPageModal from "@/components/shared/SetPageModal";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       onPageChange,
                                       isLoading = false
                                   }: PaginationProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const theme = useTheme();
    const currentPageLabel = `${currentPage.toLocaleString()} / ${totalPages.toLocaleString()}`;

    const updatePage = (newPage: number) => {
        onPageChange(Math.max(1, Math.min(totalPages, newPage)));
    };

    return (
        <View>
            <View style={[styles.row, {backgroundColor: theme.background}]}>
                <ThemedButton
                    icon={<Entypo name="chevron-left" size={24} color={theme.background} />}
                    onPress={() => updatePage(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    style={styles.navButton}
                />
                <ThemedButton
                    label={currentPageLabel}
                    loading={isLoading}
                    onPress={() => setModalVisible(true)}
                />
                <ThemedButton
                    icon={<Entypo name="chevron-right" size={24} color={theme.background} />}
                    onPress={() => updatePage(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    style={styles.navButton}
                />
            </View>

            <SetPageModal
                visible={modalVisible}
                onClose={page => {
                    updatePage(page);
                    setModalVisible(false);
                }}
                initialValue={currentPage.toString()}
                maxPage={totalPages}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    navButton: {width: 50},
});
