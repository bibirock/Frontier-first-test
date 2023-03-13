<template lang="pug">
teleport(to="body")
    div.modal-container(:class="'set-item-center z-10 fixed-center'")
        .modal-mask(@click='closeModal()' :class="'fixed-center bg-black/[.5]'")
        .modal-content(:class="'bg-white z-10 p-10 rounded-xl relative'")
            Icon(@click='closeModal()' icon="iconoir:cancel" width="25" :class="'absolute top-5 right-5 cursor-pointer'")
            p.text-center.text-lg {{ "Profile" }}
            img(:src="userData.picture.large" :class="'block mx-auto rounded-xl border-1'")
            .info-area(:class="'set-item-center flex-col w-fit mx-auto mt-4'")
                span {{ "Name : " + userData.name.first }}
                span {{ "Gender : " + userData.gender }}
                span {{ "Country : " + userData.location.country }}
                span {{ "Email : " + userData.email }}
</template>

<script lang="ts" setup>
import type { UserData } from '@/types/type';

type Props = {
    userData: UserData;
};

defineProps<Props>();

const emit = defineEmits(['closeModal']);
function closeModal() {
    emit('closeModal');
}
</script>

<style lang="scss" scoped>
.fixed-center {
    @apply top-0 bottom-0 left-0 right-0 fixed;
}
span {
    @apply self-start;
}
</style>
