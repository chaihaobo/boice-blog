import {FC, useState} from "react";
import {Link} from "react-router";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@heroui/react";
import ThemeToggle from "./ThemeToggle";

export const Logo = () => {
    return (
        <svg
            fill="none"
            height="36"
            viewBox="0 0 36 36"
            width="36"
            className="text-primary"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18 3C9.716 3 3 9.716 3 18C3 26.284 9.716 33 18 33C26.284 33 33 26.284 33 18C33 9.716 26.284 3 18 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 18C12 14.6863 14.6863 12 18 12C21.3137 12 24 14.6863 24 18C24 21.3137 21.3137 24 18 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18 24V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18 24L24 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const BlogNavbar: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuItems = [
        {title: "文章", to: "/"},
        {title: "关于我", to: "/me"},
    ];

    return (
        <div className="sticky top-0 z-50">
            <Navbar
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                className="bg-background/60 backdrop-blur-md border-b border-divider"
                maxWidth="full"
            >
                <NavbarContent className="flex-1/4">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand className="gap-2">
                        <Logo/>
                        <p className="font-bold text-xl text-primary">Boice Blog</p>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-8 flex-3/4" justify='center'>
                    {menuItems.map((item) => (
                        <NavbarItem key={item.to}>
                            <Link
                                className="text-foreground hover:text-primary transition-colors"
                                to={item.to}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.title}
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <ThemeToggle />
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu className="bg-background/60 backdrop-blur-md">
                    {menuItems.map((item) => (
                        <NavbarMenuItem key={item.to}>
                            <Link
                                className="w-full py-2 px-4 hover:bg-primary/10 rounded-lg transition-colors"
                                to={item.to}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.title}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </div>
    );
};

export default BlogNavbar; 