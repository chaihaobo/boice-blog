import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';

const ThemeToggle: FC = () => {
    const [isDark, setIsDark] = useState(false);

    // 初始化主题
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // 优先使用保存的主题，其次使用系统偏好
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        const newIsDark = !isDark;
        
        if (newIsDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        
        setIsDark(newIsDark);
    };

    return (
        <Button
            isIconOnly
            variant="light"
            onClick={toggleTheme}
            className="ml-2"
            title={`切换到${isDark ? '亮色' : '暗色'}模式`}
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={isDark ? 'moon' : 'sun'}
                initial={{ rotate: isDark ? -90 : 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: isDark ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {isDark ? (
                    <svg
                        className="w-5 h-5 text-default-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-5 h-5 text-default-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                )}
            </motion.div>
        </Button>
    );
};

export default ThemeToggle; 