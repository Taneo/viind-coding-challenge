import axios from 'axios'

const BASE_URL = `https://sdp-sandbox-billing.cluster01.viind.io/`

const createAxiosInstance = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        },
    })
}

const post = <T>(
    resource: string,
    model: { [key: string]: unknown } | string
): Promise<T> => {
    return createAxiosInstance()
        .post<T>(resource, model)
        .then((res) => res.data)
}

const put = <T>(
    resource: string,
    model: { [key: string]: unknown }
): Promise<T> => {
    return createAxiosInstance()
        .put<T>(resource, model)
        .then((res) => res.data)
}

export const apiProvider = {
    post,
    put,
}
