import type { UserData } from '@/types/type';
import { userWallSetting } from '@/store';
import { computed, ref } from 'vue';
const $store = userWallSetting();

export const $storeSelectedCount = computed({
    get() {
        return $store.getUserCount;
    },
    set(newValue) {
        $store.updateUserCount(newValue);
    }
});

export const $storePageMode = computed({
    get() {
        return $store.getIsDisplayMode;
    },
    set(newValue) {
        $store.updateDisplayMode(newValue ? 'Card' : 'List');
    }
});

type UserId = UserData['login']['uuid'];

const favoriteList = ref<Array<UserData>>([]);
export function $getFavoriteList(): [] {
    const localFavorite = JSON.parse(window.sessionStorage.getItem('favoriteList') || 'null');
    if (localFavorite !== null) {
        favoriteList.value = localFavorite;
        return localFavorite;
    } else {
        favoriteList.value = [];
        return [];
    }
}

export function $addFavorite(userData: UserData) {
    favoriteList.value.push(userData);
    window.sessionStorage.setItem('favoriteList', JSON.stringify(favoriteList.value));
}

export function $checkFavoriteUser(id: UserId) {
    return favoriteList.value.some((e) => e.login.uuid === id);
}

export function $removeFavorite(id: UserId) {
    const index = favoriteList.value.findIndex((e) => e.login.uuid === id);
    favoriteList.value.splice(index as number, 1);
    window.sessionStorage.setItem('favoriteList', JSON.stringify(favoriteList.value));
}
