import request from '../utils/request';

type UserInfo = {
        rows: {
            account: string
            username: string
        }
}

type StartRecord = {
    message: string
}

export const getUserInfo = () => {
    return request<UserInfo>({
        method: 'GET',
        url: 'https://api.hnilab.com/api/OpenData/GetUserInfo',
    })
}