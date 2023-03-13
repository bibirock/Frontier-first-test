import type { ErrorType } from '@/types/type';
import { ErrorStatus } from '@/types/type';
import { ref, reactive } from 'vue';

export const $netWorkError = ref(false);

export const $errorStatus: ErrorType = reactive($getInitialErrorState());
export function $getInitialErrorState() {
    return {
        status: ErrorStatus.Nodata,
        title: 'No Data',
        subTitle: 'Please add favorite user : )'
    };
}

export function $resetErrorState() {
    Object.assign($errorStatus, $getInitialErrorState());
    $netWorkError.value = false;
}

export function $onNetworkError() {
    $netWorkError.value = true;
    ($errorStatus.status = ErrorStatus.NetworkError), ($errorStatus.title = 'Network Error');
    $errorStatus.subTitle = 'Please confirm your internet connection or try again';
}
