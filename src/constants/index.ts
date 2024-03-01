const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
}

const AUTH_INITIAL_STATE = {
    user: INITIAL_USER,
    isAuthenticated: false,
    isLoading: false,
    setIsAuthenticated: () => {},
    setUser: () => {},
    checkUserAuth: async () => false as boolean
}