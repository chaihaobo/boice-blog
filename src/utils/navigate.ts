import {useTransition} from "react";
import {useNavigate} from "react-router";

const [isPending, startTransition] = useTransition()

const useNavigateTransition = () => {
    const navigate = useNavigate();
    return {
        start: (path: string) => {
            startTransition(() => {
                navigate(path)
            })
        },
        isPending
    }

}


export default useNavigateTransition