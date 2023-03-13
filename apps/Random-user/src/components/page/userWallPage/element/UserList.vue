<template lang="pug">
div.card-list(:class="'p-2 sm:p-11'")
    .user-area(:class="'mx-auto w-11/12 set-item-center flex-col'")
        .user-list.cursor-pointer(v-for='user in userList' @click="sendUserData(user)" :class="'m-2 w-full rounded-lg border overflow-hidden md:w-[60%] lg:w-[50%] sm:hover:drop-shadow-md sm:hover:scale-105 bg-white'")
            .info-area(:class="'mx-auto flex'")
                img(:src="user?.picture.large" referrerPolicy="no-referrer" :class="'hidden sm:block'")
                img(:src="user?.picture.medium" referrerPolicy="no-referrer" :class="'block self-center sm:hidden'")
                .user-info(:class="' basis-48 px-2 py-0 sm:p-12 sm:py-5 sm:basis-1/2 flex flex-col justify-between'")
                    span {{ "Name : " + user.name.first }}
                    span {{ "Country : " + user.location.country }}
                    span {{ "Gender : " + user.gender }}
                Icon.favorite-icon(v-if="$checkFavoriteUser(user.login.uuid)" @click.stop="$removeFavorite(user.login.uuid)" icon="mdi:heart" color="red" width="50" height="50")
                Icon.favorite-icon(v-else @click.stop="$addFavorite(user)" icon="mdi:cards-heart-outline" width="50" height="50")
                Icon.favorite-icon-mobile(v-if="$checkFavoriteUser(user.login.uuid)" @click.stop="$removeFavorite(user.login.uuid)" icon="mdi:heart" color="red" width="25" height="25")
                Icon.favorite-icon-mobile(v-else @click.stop="$addFavorite(user)" icon="mdi:cards-heart-outline" width="25" height="25")
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
span {
    @apply block text-left whitespace-nowrap;
}
.favorite-icon {
    @apply basis-[100px] self-center flex-shrink-0 hover:scale-105 hidden sm:block;
}
.favorite-icon-mobile {
    @apply basis-[50px] self-center flex-shrink-0  sm:hidden;
}
</style>
