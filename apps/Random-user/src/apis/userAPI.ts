import type { RequireUserDataParams } from '@/types/type';
const BASEURL = 'https://randomuser.me/api/';

export async function $fetchUserList(params: RequireUserDataParams) {
    const res = await fetch(`${BASEURL}?page=${params.page}&results=${params.results}&seed=TEST`);
    return res.json();
}
