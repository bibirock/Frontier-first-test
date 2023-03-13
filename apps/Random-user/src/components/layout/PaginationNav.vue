<template lang="pug">
nav
    div(:class="'set-item-center'")
        div(class="set-item-center")
            button.control-btn(href="#" @click="toPrevPage()" :class="{ 'cursor-not-allowed': current === 1 }")
                Icon(icon="material-symbols:chevron-left" width="22" height="22")
            button(@click="toPrevPage(jumpPageCount)" :class="'w-6 mx-auto'" v-show="current > 3" @mouseover="isShowRewind = true" @mouseleave="isShowRewind = false")
                Icon(:class="'ml-1 text-hight-light'" v-show="isShowRewind" icon="material-symbols:keyboard-double-arrow-left" width="20" height="20")
                Icon(v-show="!isShowRewind" icon="ion:ellipsis-horizontal" width="20" height="20" :class="'ml-1 text-gray-400 cursor-pointer'")
        ul(:class="'flex m-0'")
            li(v-for="number in totalPages")
                button.list-item(@click="getSelectPageNumber(number)" :class="getPageItemClass(number)" href="#" v-show="shouldDisplay(number) ") {{ number }}
        div(class="set-item-center")
            button(@click="toNextPage(jumpPageCount)" :class="'w-6 mx-auto'" v-show="totalPages - current > 3" @mouseover="isShowFastForward = true" @mouseleave="isShowFastForward = false")
                Icon(:class="'mr-1 text-hight-light'" v-show="isShowFastForward" icon="material-symbols:keyboard-double-arrow-right" width="20" height="20")
                Icon(icon="ion:ellipsis-horizontal" v-show="!isShowFastForward" width="20" height="20" :class="'mr-1 text-gray-400 cursor-pointer'")
            button.control-btn(href="#" @click="toNextPage()" :class="{ 'cursor-not-allowed': current === totalPages }")
                Icon(icon="material-symbols:chevron-right" width="22" height="22")
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';

const isShowFastForward = ref(false);
const isShowRewind = ref(false);
const jumpPageCount = ref(5);

interface Props {
    total: number;
    current: number;
    pageSize: number;
}

const props = defineProps<Props>();

const totalPages = computed(() => {
    return Math.ceil(props.total / props.pageSize);
});

function toPrevPage(count = 1) {
    handlePageChange(props.current - count);
}

function toNextPage(count = 1) {
    handlePageChange(props.current + count);
}

function getSelectPageNumber(number: number) {
    handlePageChange(number);
}

const emit = defineEmits(['pageChange']);
function handlePageChange(newPage: number) {
    if (newPage === props.current) {
        return;
    }
    if (newPage < 1) {
        newPage = 1;
    }
    if (newPage > totalPages.value) {
        newPage = totalPages.value;
    }
    emit('pageChange', newPage);
}

function getPageItemClass(number: number) {
    return {
        'text-hight-light border-cyan-500': props.current === number,
        'border-gray-300 text-gray-500': props.current !== number
    };
}

function shouldDisplay(number: number) {
    const current = props.current;
    const total = totalPages.value;

    if (current > 1 && current !== total) {
        return [1, current - 1, current, current + 1, total].includes(number);
    }
    if (props.current === 1) {
        return [current, current + 1, current + 2, total].includes(number);
    } else {
        return [1, total, total - 1, total - 2].includes(number);
    }
}

watch(
    () => props.pageSize,
    () => {
        handlePageChange(1);
    }
);
</script>

<style scoped lang="scss">
button.list-item {
    @apply px-3 py-1 mx-1  bg-white border  hover:text-hight-light hover:border-cyan-500;
}
button.control-btn {
    @apply block px-2 py-1 text-gray-500 bg-white border border-gray-300;
}
</style>
