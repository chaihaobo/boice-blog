import {createAlova} from 'alova';
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';
import toast from "@/utils/toast.ts";

interface Response<T> {
    code: string
    message: string
    data: T
}

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

export const api = createAlova({
    baseURL: apiBaseURL,
    requestAdapter: adapterFetch(),
    statesHook: ReactHook,
    cacheFor: null,
    beforeRequest: async (method) => {
        const password = localStorage.getItem("password");
        if (password) {
            method.config.headers.Authorization = password;
        }
    },
    responded: {
        onSuccess: async (response) => {
            if (response.status == 500) {
                toast.show({
                    title: "服务器异常",
                    description: "Internal Server Error",
                    color: "danger",
                })
                throw new Error("服务器异常")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const responseBody = await response.json() as Response<any>;
            if (response.status == 401) {
                // todo
            }
            if (response.status >= 400) {
                toast.show({
                    title: "请求失败",
                    description: responseBody.message,
                    color: "danger",
                })
                throw new Error(responseBody.message)
            }
            return responseBody.data
        },
        onError: (err: Error,) => {
            toast.show({
                title: "服务器异常",
                description: err.message,
                color: "danger",
            })
        },
    },

});


export const verifyPermission = () => {
    return api.Post<boolean>('/user/verify-permission', {});
};
