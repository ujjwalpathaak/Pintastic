import { create } from "zustand";

interface userState {
  user: {
    email: string;
    userName: string;
    userImage: string;
    favPins: string[];
  } | null;
  isLoggedIn: boolean;
  login: (email: string, name: string, image: string, pins: string[]) => void;
  logout: () => void;
}

const useStore = create<userState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (email, name, image, pins) => {
    const dummyUserData = {
      email: email,
      userName: name,
      userImage: image,
      favPins: pins,
    };
    set({ user: dummyUserData, isLoggedIn: true });
  },
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useStore;
