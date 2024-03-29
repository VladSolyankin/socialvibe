type IUser = {
  fullName: string;
  email: string;
  avatarUrl: string;
  isOnline: boolean;
  info: IUserInfo;
  friends: Array<string>;
  photos: {
    albums: Array<IUserAlbum>;
    userImages: Array<IUserImage>;
  };
  postsIds: Array<string>;
};

type IUserChats = {};

export type IUserPhotos = {
  title: string;
  url: string;
};

type IUserPosts = {};

type IAuthContext = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkUserAuth: () => Promise<boolean>;
};

type IUserAlbum = {
  images: Array<string>;
  date: string;
  url: string;
  previewUrl: string;
  title: string;
};

type IUserImage = {
  url: string;
  date: Date;
};

type IUserInfo = {
  birthDate: string;
  city: string;
  phone: string;
  status: string;
};

export type IUserPost = {
  comments: Array<{ content: string; user_id: string }>;
  images: Array<string>;
  title: string;
  user_id: string;
};
