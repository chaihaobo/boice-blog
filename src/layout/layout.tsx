import {FC, Suspense, useEffect, useRef, useState} from "react";
import {Outlet, useNavigate} from "react-router";
import {addToast, Button, Input, Spinner} from "@heroui/react";
import BlogNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "../utils/toast"

const Layout: FC = () => {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const lastKeyPressTime = useRef<number>(0);
    toast.set((props) => {
        addToast({
            ...props
        })
    })

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'n') {
                const now = Date.now();
                if (now - lastKeyPressTime.current < 500) { // 500ms 内按两次
                    e.preventDefault();
                    setIsPasswordModalOpen(true);
                    lastKeyPressTime.current = 0; // 重置计时器
                } else {
                    lastKeyPressTime.current = now;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSubmit = () => {
        if (password !== 'chb112233') {
            toast.show({
                title: "密码错误",
                description: "请重新输入密码",
                color: "danger",
            })
            return
        }
        navigate('/admin/article/new');
        setIsPasswordModalOpen(false);
        setPassword('');

    };

    return (
        <div className="min-h-screen flex flex-col">
            <BlogNavbar/>
            <main className="flex-grow w-full bg-background">
                <Suspense fallback={<Spinner className="w-full h-20 justify-center" size="lg"/>}>
                    <Outlet/>
                </Suspense>
            </main>
            <Footer/>

            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-gray-100/30 backdrop-blur-[2px] flex items-center justify-center z-50">
                    <div className="bg-white/90 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            请输入管理员密码
                        </h3>
                        <div className="mt-4">
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="请输入密码"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSubmit();
                                    }
                                }}
                                className="mt-2 w-full"
                            />
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <Button
                                variant="solid"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                确认
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setIsPasswordModalOpen(false);
                                    setPassword('');
                                }}
                            >
                                取消
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Layout