import { create } from "zustand";

interface PageTitleState {
  title: string;
  setTitle: (newTitle: string) => void;
}

const usePageTitleStore = create<PageTitleState>((set) => ({
  title: "",
  setTitle: (newTitle: string) => set({ title: newTitle }),
}));

export default usePageTitleStore;
