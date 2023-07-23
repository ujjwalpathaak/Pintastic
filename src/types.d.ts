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
