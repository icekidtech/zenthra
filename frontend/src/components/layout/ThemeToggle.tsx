
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  const themes = [
    { name: "Light", value: "light" },
    { name: "Dark", value: "dark" },
    { name: "System", value: "system" }
  ];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // Handle system preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  // Get icon based on current theme
  const getIcon = () => {
    if (theme === "dark") {
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 11C9.433 11 11 9.433 11 7.5C11 5.567 9.433 4 7.5 4C5.567 4 4 5.567 4 7.5C4 9.433 5.567 11 7.5 11ZM7.5 12C10.0376 12 12.1 9.9376 12.1 7.4C12.1 4.8624 10.0376 2.8 7.5 2.8C4.9624 2.8 2.9 4.8624 2.9 7.4C2.9 9.9376 4.9624 12 7.5 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          <path d="M7.5 0C7.77614 0 8 0.223858 8 0.5V1.5C8 1.77614 7.77614 2 7.5 2C7.22386 2 7 1.77614 7 1.5V0.5C7 0.223858 7.22386 0 7.5 0ZM7.5 13C7.77614 13 8 13.2239 8 13.5V14.5C8 14.7761 7.77614 15 7.5 15C7.22386 15 7 14.7761 7 14.5V13.5C7 13.2239 7.22386 13 7.5 13ZM15 7.5C15 7.77614 14.7761 8 14.5 8H13.5C13.2239 8 13 7.77614 13 7.5C13 7.22386 13.2239 7 13.5 7H14.5C14.7761 7 15 7.22386 15 7.5ZM2 7.5C2 7.77614 1.77614 8 1.5 8H0.5C0.223858 8 0 7.77614 0 7.5C0 7.22386 0.223858 7 0.5 7H1.5C1.77614 7 2 7.22386 2 7.5ZM12.7803 2.71967C12.9757 2.91502 12.9757 3.23161 12.7803 3.42697L12.0732 4.13407C11.8778 4.32943 11.5612 4.32943 11.3659 4.13407C11.1705 3.93871 11.1705 3.62212 11.3659 3.42676L12.073 2.71967C12.2683 2.52431 12.585 2.52431 12.7803 2.71967ZM3.63404 11.866C3.8294 12.0614 3.8294 12.3779 3.63404 12.5733L2.92694 13.2804C2.73159 13.4757 2.41499 13.4757 2.21963 13.2804C2.02428 13.085 2.02428 12.7684 2.21963 12.5731L2.92673 11.866C3.12209 11.6707 3.43868 11.6707 3.63404 11.866ZM12.7803 12.5731C12.9757 12.3777 12.9757 12.0611 12.7803 11.8658L12.0732 11.1587C11.8778 10.9633 11.5612 10.9633 11.3659 11.1587C11.1705 11.354 11.1705 11.6706 11.3659 11.866L12.073 12.5731C12.2683 12.7684 12.585 12.7684 12.7803 12.5731ZM3.63404 3.42697C3.8294 3.23161 3.8294 2.91502 3.63404 2.71967L2.92694 2.01257C2.73159 1.81721 2.41499 1.81721 2.21963 2.01257C2.02428 2.20793 2.02428 2.52452 2.21963 2.71988L2.92673 3.42697C3.12209 3.62233 3.43868 3.62233 3.63404 3.42697Z" fill="currentColor"></path>
        </svg>
      );
    } else if (theme === "light") {
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.75 0.75V2.25H7.25V0.75H7.75ZM11.182 2.818L10.132 3.868L9.632 3.368L10.682 2.318L11.182 2.818ZM3.818 2.818L4.868 3.868L4.368 4.368L3.318 3.318L3.818 2.818ZM7.5 3.5C9.433 3.5 11 5.067 11 7C11 8.933 9.433 10.5 7.5 10.5C5.567 10.5 4 8.933 4 7C4 5.067 5.567 3.5 7.5 3.5ZM7.5 4C5.843 4 4.5 5.343 4.5 7C4.5 8.657 5.843 10 7.5 10C9.157 10 10.5 8.657 10.5 7C10.5 5.343 9.157 4 7.5 4ZM0.75 7.25H2.25V7.75H0.75V7.25ZM12.75 7.25H14.25V7.75H12.75V7.25ZM10.132 10.132L11.182 11.182L10.682 11.682L9.632 10.632L10.132 10.132ZM4.868 10.132L3.818 11.182L3.318 10.682L4.368 9.632L4.868 10.132ZM7.25 12.75V14.25H7.75V12.75H7.25Z" fill="currentColor"/>
        </svg>
      );
    } else {
      return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4.5C2 3.11929 3.11929 2 4.5 2H10.5C11.8807 2 13 3.11929 13 4.5V10.5C13 11.8807 11.8807 13 10.5 13H4.5C3.11929 13 2 11.8807 2 10.5V4.5ZM4.5 3C3.67157 3 3 3.67157 3 4.5V10.5C3 11.3284 3.67157 12 4.5 12H10.5C11.3284 12 12 11.3284 12 10.5V4.5C12 3.67157 11.3284 3 10.5 3H4.5ZM7.5 9C8.60457 9 9.5 8.10457 9.5 7C9.5 5.89543 8.60457 5 7.5 5C6.39543 5 5.5 5.89543 5.5 7C5.5 8.10457 6.39543 9 7.5 9Z" fill="currentColor" />
        </svg>
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {getIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem 
            key={t.value}
            onClick={() => handleThemeChange(t.value)}
            className={theme === t.value ? "bg-accent text-accent-foreground" : ""}
          >
            {t.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
