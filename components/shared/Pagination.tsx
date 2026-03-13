import React, { useRef, useState } from 'react';
import {View} from 'react-native';
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
    const lastLabel = useRef('');
    const currentPageLabel = `${currentPage.toLocaleString()} / ${totalPages.toLocaleString()}`;
    if (!isLoading) {
        lastLabel.current = currentPageLabel;
    }

    const updatePage = (newPage: number) => {
        onPageChange(Math.max(1, Math.min(totalPages, newPage)));
    };

    return (
        <View>
            <View className="flex-row justify-between items-center p-2.5" style={{backgroundColor: theme.background}}>
                <ThemedButton
                    icon={<Entypo name="chevron-left" size={24} color={theme.background} />}
                    onPress={() => updatePage(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    className="w-[50px]"
                />
                <ThemedButton
                    label={lastLabel.current || currentPageLabel}
                    disabled={isLoading}
                    onPress={() => setModalVisible(true)}
                    labelStyle={isLoading ? {opacity: 0} : undefined}
                />
                <ThemedButton
                    icon={<Entypo name="chevron-right" size={24} color={theme.background} />}
                    onPress={() => updatePage(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    className="w-[50px]"
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
