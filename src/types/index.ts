type IUser = {
    id: string,
    name: string,
    username: string,
    email: string,
    imageUrl: string,
    bio: string
};

type IAuthContext = {
    user: IUser,
    isLoading: boolean,
    setUser: React.Dispatch<React.SetStateAction<IUser>>,
    isAuthenticated: boolean,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    checkUserAuth: () => Promise<boolean>
};