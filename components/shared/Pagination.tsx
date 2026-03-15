import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import useTheme from '@/hooks/useTheme';
import {ChevronLeft, ChevronRight} from 'lucide-react-native';
import SetPageModal from '@/components/shared/SetPageModal';

const SLOT_COUNT = 7;

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
};

type Slot = {type: 'page'; page: number} | {type: 'ellipsis'} | {type: 'empty'};

/**
 * Build exactly SLOT_COUNT (7) slots for the pagination strip.
 * This guarantees the layout never shifts — every render produces the same
 * number of equal-width items regardless of currentPage or totalPages.
 *
 * Patterns for total > 7:
 *   Near start:  [1] 2  3  4  5  …  N
 *   Middle:       1  …  4 [5] 6  …  N
 *   Near end:     1  …  N-4 N-3 N-2 N-1 [N]
 */
function buildSlots(current: number, total: number): Slot[] {
    if (total <= 0) {
        return Array.from({length: SLOT_COUNT}, (): Slot => ({type: 'empty'}));
    }

    if (total <= SLOT_COUNT) {
        const slots: Slot[] = [];
        for (let i = 1; i <= total; i++) {
            slots.push({type: 'page', page: i});
        }
        while (slots.length < SLOT_COUNT) {
            slots.push({type: 'empty'});
        }
        return slots;
    }

    // total > 7: always produce exactly 7 slots
    // Boundary sizes for the "near start" and "near end" regions
    const nearStart = current <= 4;
    const nearEnd = current >= total - 3;

    if (nearStart) {
        // 1 2 3 4 5 … N
        return [
            {type: 'page', page: 1},
            {type: 'page', page: 2},
            {type: 'page', page: 3},
            {type: 'page', page: 4},
            {type: 'page', page: 5},
            {type: 'ellipsis'},
            {type: 'page', page: total},
        ];
    }

    if (nearEnd) {
        // 1 … N-4 N-3 N-2 N-1 N
        return [
            {type: 'page', page: 1},
            {type: 'ellipsis'},
            {type: 'page', page: total - 4},
            {type: 'page', page: total - 3},
            {type: 'page', page: total - 2},
            {type: 'page', page: total - 1},
            {type: 'page', page: total},
        ];
    }

    // Middle: 1 … current-1 current current+1 … N
    return [
        {type: 'page', page: 1},
        {type: 'ellipsis'},
        {type: 'page', page: current - 1},
        {type: 'page', page: current},
        {type: 'page', page: current + 1},
        {type: 'ellipsis'},
        {type: 'page', page: total},
    ];
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    isLoading = false,
}: PaginationProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const theme = useTheme();

    // Remember the last known totalPages so the layout stays stable during loading.
    // When loading, totalPages often falls back to 1 (no data yet), which would
    // collapse the slot strip. Using the stale value keeps the skeleton in place.
    const lastTotalPages = useRef(totalPages);
    if (!isLoading && totalPages > 0) {
        lastTotalPages.current = totalPages;
    }
    const stableTotalPages = isLoading ? lastTotalPages.current : totalPages;

    const clampPage = (page: number) =>
        Math.max(1, Math.min(stableTotalPages, page));

    const slots = buildSlots(currentPage, stableTotalPages);

    return (
        <View style={[styles.root, {backgroundColor: theme.background}]}>
            <View style={[styles.row, isLoading && styles.loadingRow]}>
                {/* Previous */}
                <Button
                    variant="ghost"
                    size="icon"
                    onPress={() => onPageChange(clampPage(currentPage - 1))}
                    disabled={currentPage === 1 || isLoading}
                    style={styles.navButton}
                >
                    <ChevronLeft size={20} color={theme.text} />
                </Button>

                {/* Fixed-width page slots */}
                {slots.map((slot, index) => {
                    if (slot.type === 'empty') {
                        return <View key={`empty-${index}`} style={styles.slot} />;
                    }
                    if (slot.type === 'ellipsis') {
                        return (
                            <Pressable
                                key={`ellipsis-${index}`}
                                style={styles.slot}
                                onPress={() => setModalVisible(true)}
                                disabled={isLoading}
                            >
                                <Text style={{color: theme.icon}}>…</Text>
                            </Pressable>
                        );
                    }
                    const isCurrent = slot.page === currentPage;
                    return (
                        <Pressable
                            key={slot.page}
                            style={[
                                styles.slot,
                                styles.pageSlot,
                                isCurrent && {backgroundColor: theme.primary},
                                {
                                    borderRadius: 0,
                                }
                            ]}
                            onPress={() => onPageChange(slot.page)}
                            disabled={isLoading}
                        >
                            <Text
                                style={[
                                    styles.pageText,
                                    isCurrent
                                        ? {color: theme.background, fontWeight: '700'}
                                        : {color: theme.text},
                                ]}
                            >
                                {slot.page}
                            </Text>
                        </Pressable>
                    );
                })}

                {/* Next */}
                <Button
                    variant="ghost"
                    size="icon"
                    onPress={() => onPageChange(clampPage(currentPage + 1))}
                    disabled={currentPage === stableTotalPages || isLoading}
                    style={styles.navButton}
                >
                    <ChevronRight size={20} color={theme.text} />
                </Button>
            </View>

            <SetPageModal
                visible={modalVisible}
                onSubmit={page => {
                    onPageChange(clampPage(page));
                    setModalVisible(false);
                }}
                initialValue={currentPage.toString()}
                maxPage={totalPages}
            />
        </View>
    );
}

export {buildSlots, SLOT_COUNT};

const SLOT_SIZE = 40;

const styles = StyleSheet.create({
    root: {
        paddingVertical: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
    },
    navButton: {
        width: 44,
        height: 44,
    },
    slot: {
        width: SLOT_SIZE,
        height: SLOT_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageSlot: {
        borderRadius: 6,
    },
    pageText: {
        fontSize: 14,
    },
    loadingRow: {
        opacity: 0.4,
    },
});
