import {createAlova} from 'alova';
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';
import toast from "@/utils/toast.ts";

interface Response<T> {
    code: string
    message: string
    data: T
}


export const api = createAlova({
    baseURL: '/api',
    requestAdapter: adapterFetch(),
    statesHook: ReactHook,
    beforeRequest: async () => {
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
