import React, { useRef, useState } from 'react';
import {View} from 'react-native';
import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
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
                <Button
                    className="h-10 px-2.5 w-[50px]"
                    onPress={() => updatePage(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                >
                    <Entypo name="chevron-left" size={24} color={theme.background} />
                </Button>
                <Button
                    className="h-10 px-2.5"
                    disabled={isLoading}
                    onPress={() => setModalVisible(true)}
                >
                    <Text className="font-bold" style={isLoading ? {opacity: 0} : undefined}>
                        {lastLabel.current || currentPageLabel}
                    </Text>
                </Button>
                <Button
                    className="h-10 px-2.5 w-[50px]"
                    onPress={() => updatePage(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                >
                    <Entypo name="chevron-right" size={24} color={theme.background} />
                </Button>
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
