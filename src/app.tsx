import {HeroUIProvider, ToastProvider} from "@heroui/react";
import {RouterProvider} from "react-router";
import router from "@/router/router.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1
        }
    }
});

export default function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false}/>
                <HeroUIProvider>
                    <ToastProvider/>
                    <RouterProvider router={router}/>
                </HeroUIProvider>
            </QueryClientProvider>
        </>
    )
}