export type UserData = {
  nickname: string;
  avatar: string;
  role: "kid" | "parent";
};

export const UserStore = {
  getUserData: (): UserData => {
    const defaultData = { nickname: "Alex", avatar: "/BPI assets/avatars/Girl w yellow bg.png", role: "kid" as const };
    if (typeof window === 'undefined') return defaultData;
    const userData = localStorage.getItem('sandbox-user');
    return userData ? JSON.parse(userData) : defaultData;
  },

  saveUserData: (userData: UserData) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('sandbox-user', JSON.stringify(userData));
    window.dispatchEvent(new CustomEvent('user-updated'));
  }
};