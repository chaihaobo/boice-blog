import {createContext, FC, ReactNode, use, useTransition} from "react";
import {useNavigate} from "react-router";


export interface Navigator {
    isPending: boolean
    navigate: (path: string) => void
}

const NavigateContext = createContext<Navigator | null>(null)


export const NavigateProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [isPending, startTransition] = useTransition()
    const routerNavigate = useNavigate();

    return (
        <NavigateContext.Provider value={{
            isPending, navigate: (path: string) => {
                startTransition(() => {
                    routerNavigate(path)
                })
            }
        }}>
            {children}
        </NavigateContext.Provider>
    )

}

export const useNavigator = () => {
    const navigator = use(NavigateContext);
    if (!navigator) {
        throw new Error("No navigator set. pls least set one!")
    }
    return navigator
}