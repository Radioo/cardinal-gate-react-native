// components/Pagination.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { ThemedButton } from "@/components/ThemedButton";
import { useTheme } from "@/hooks/useTheme";
import { Entypo } from "@expo/vector-icons";
import SetPageModal from "@/components/SetPageModal";

interface PaginationProps {
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
        onPageChange(newPage < 1 ? 1 : (newPage > totalPages ? totalPages : newPage));
    };

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme.background,
                padding: 10,
            }}>
                <ThemedButton
                    icon={<Entypo name="chevron-left" size={24} color={theme.background} />}
                    onPress={() => updatePage(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    style={{width: 50}}
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
                    style={{width: 50}}
                />
            </View>

            <SetPageModal
                modalVisible={modalVisible}
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
