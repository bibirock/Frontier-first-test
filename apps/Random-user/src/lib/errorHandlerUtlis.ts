import type { ErrorType } from '@/types/type';
import { ref, reactive } from 'vue';

export const $netWorkError = ref(false);

export const $errorStatus: ErrorType = reactive($getInitalErrorState());
export function $getInitalErrorState() {
    return {
        status: '404',
        title: 'No Data',
        subTitle: 'Please add favorite user : )'
    };
}

export function $resetErrorState() {
    Object.assign($errorStatus, $getInitalErrorState());
    $netWorkError.value = false;
}

export function $onNetworkError() {
    $netWorkError.value = true;
    ($errorStatus.status = '500'), ($errorStatus.title = 'Network Erorr');
    $errorStatus.subTitle = 'Please try again';
}
