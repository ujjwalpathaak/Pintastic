import { log } from "console";
import { create } from "zustand";

interface userState {
  user: {
    email: string;
    userName: string;
    userImage: string;
    favPins: string[];
  } | null;
  GuestUser: {
    email: string;
    userName: string;
    userImage: string;
  } | null;
  isLoggedIn: boolean;
  login: (email: string, name: string, image: string, pins: string[]) => void;
  Guestlogin: (email: string, name: string, image: string) => void;
  logout: () => void;
}

const useStore = create<userState>((set) => ({
  user: null,
  GuestUser: null,
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
  Guestlogin: (email, name, image) => {
    const dummyUserData = {
      email: email,
      userName: name,
      userImage: image,
    };
    set({ GuestUser: dummyUserData, isLoggedIn: true });
  },
  logout: () => set({ user: null, GuestUser: null, isLoggedIn: false }),
}));

export default useStore;
