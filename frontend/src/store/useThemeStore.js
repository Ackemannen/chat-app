import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("voxitychat-theme") || "coffee",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("voxitychat-theme", theme);
  },
}));