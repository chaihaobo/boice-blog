import axios from 'axios';

const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:2222',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 在这里可以添加token等认证信息
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        const { data } = response;
        if (data.code === '0000000') {
            return data;
        }
        return Promise.reject(new Error(data.message || '请求失败'));
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { request }; 