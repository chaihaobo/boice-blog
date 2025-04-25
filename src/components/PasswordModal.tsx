import {FC, useEffect, useRef, useState} from "react";
import toast from "@/utils/toast.ts";
import {Button, Input} from "@heroui/react";
import {useNavigate} from "react-router";
import {verifyPermission} from "@/api/api.ts";

const PasswordModal: FC = () => {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [password, setPassword] = useState('');
    const lastKeyPressTime = useRef<number>(0);
    const passwordInput = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();
    const handleSubmit = async () => {
        localStorage.setItem("password", password)
        const hasPermission = await verifyPermission()
        if (!hasPermission) {
            toast.show({
                title: "密码错误",
                description: "请重新输入密码",
                color: "danger",
            })
            setPassword('');
            return
        }
        navigate('articles/create');
        setIsPasswordModalOpen(false);
        setPassword('');
    };

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

    useEffect(() => {
        if (isPasswordModalOpen) {
            passwordInput.current!.focus();
        }

    }, [isPasswordModalOpen]);


    return (
        <>
            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-gray-100/30 backdrop-blur-[2px] flex items-center justify-center z-50">
                    <div className="bg-white/90 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            请输入管理员密码
                        </h3>
                        <div className="mt-4">
                            <Input
                                ref={passwordInput}
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
                                onPress={handleSubmit}
                            >
                                确认
                            </Button>
                            <Button
                                variant="ghost"
                                onPress={() => {
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
        </>
    )

}


export default PasswordModal