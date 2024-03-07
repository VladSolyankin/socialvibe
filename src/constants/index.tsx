export const INITIAL_USER = {
  fullName: '',
  email: '',
  avatarUrl: '',
  isOnline: false,
  info: { birthDate: '', city: '', phone: '', status: '' },
  friends: [],
  photos: {
    albums: [],
    userImages: [],
  },
  postsIds: [],
};

export const AUTH_INITIAL_STATE = {
  user: INITIAL_USER,
  isAuthenticated: false,
  isLoading: false,
  setIsAuthenticated: () => {},
  setUser: () => {},
  checkUserAuth: async () => false as boolean,
};
