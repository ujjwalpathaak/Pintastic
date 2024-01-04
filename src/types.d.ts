export interface providerProps {
  params: {
    userId: string;
  };
}
export type userInfo = {
  email: string;
  userName: string;
  userImage: string;
  favPins: [];
};
export type pinType = {
  title: string;
  desc: string;
  name: string;
  link: string;
  image: string;
  userName: string;
  email: string;
  userImage: string;
  id: string;
};

export interface UserPinsProps {
  listOfPins: pinType[] | undefined;
}

export type pinTypeHover = {
  id: number;
  pin: {
    title: string;
    desc: string;
    link: string;
    image: string;
    userName: string;
    email: string;
    userImage: string;
    id: string;
  };
  hover: boolean;
  setHoverPin: (id: number) => void;
  isMobile: boolean;
};
