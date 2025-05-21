import {createContext, FC, ReactNode, use, useTransition} from "react";
import {useNavigate} from "react-router";


export interface Navigator {
    isPending: boolean
    navigate: (path: string) => void
}

const NavigatorContext = createContext<Navigator | null>(null)


export const NavigatorProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [isPending, startTransition] = useTransition()
    const routerNavigate = useNavigate();

    return (
        <NavigatorContext.Provider value={{
            isPending, navigate: (path: string) => {
                startTransition(() => {
                    routerNavigate(path)
                })
            }
        }}>
            {children}
        </NavigatorContext.Provider>
    )

}

export const useNavigator = () => {
    const navigator = use(NavigatorContext);
    if (!navigator) {
        throw new Error("No navigator set. pls least set one!")
    }
    return navigator
}