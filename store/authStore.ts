import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { userDetail } from '../Type/userDetail';

const authStore = (set: any) => ({
  userProfile: null as userDetail | null,
  setUser: (user: userDetail) => set({ userProfile: user }),
});

const useAuthStore = create(persist(authStore, { name: 'authStore' }));
export default useAuthStore;
