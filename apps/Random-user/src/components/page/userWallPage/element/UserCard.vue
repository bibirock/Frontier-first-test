<template lang="pug">
div.card-list(:class="'p-2 sm:p-11 mx-auto'")
    .user-area(:class="'ml-11 sm:mx-auto w-11/12 set-item-start flex-wrap flex-row'")
        .user-card(v-for='user in userList' @click="sendUserData(user)" :class="'m-2 rounded-lg w-fit max-w-[136px] overflow-hidden cursor-pointer bg-white sm:hover:drop-shadow-md  sm:hover:scale-105'")
            .user-card-items(:class="'mx-auto w-full block relative'")
                img(:src="user?.picture.large" referrerPolicy="no-referrer" :class="'w-32 h-32'" loading='lazy')
                .user-card-info(:class="'set-item-center absolute bottom-0 w-full h-7 pb-1 backdrop-blur-sm'")
                    span.user-name(:class="'text-center text-white mr-4'") {{ user.name.first }}
                    Icon.favorite-icon(v-if="$checkFavoriteUser(user.login.uuid)" @click.stop="$removeFavorite(user.login.uuid)" icon="mdi:heart" color="red" width="25" height="25")
                    Icon.favorite-icon(v-else @click.stop="$addFavorite(user)" icon="mdi:cards-heart-outline" color="white" width="25" height="25")
</template>

<script setup lang="ts">
import { $addFavorite, $checkFavoriteUser, $removeFavorite } from '@/lib/userWallPageUtils';
import type { UserArray, UserData } from '@/types/type';

type Props = {
    userList: UserArray;
};

defineProps<Props>();

const emit = defineEmits(['sendUseData']);

function sendUserData(userData: UserData) {
    emit('sendUseData', userData);
}
</script>

<style scoped lang="scss">
.favorite-icon {
    @apply hover:scale-110;
}
</style>
