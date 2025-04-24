export interface ToastProps {
    title: string;
    description: string;
    color: "default" | "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
}

let toastFunc: (props: ToastProps) => void

export default {
    set: (func: (props: ToastProps) => void) => {
        toastFunc = func
    }
    ,
    show: (props: ToastProps) => {
        if (toastFunc) {
            toastFunc(props)
        }
    }
}