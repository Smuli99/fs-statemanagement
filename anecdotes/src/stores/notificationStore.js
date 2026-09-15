import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  message: null,
  actions: {
    show: (message) => {
      set(() => ({ message }));

      setTimeout(() => {
        set(() => ({ message: null }));
      }, 5000);
    }
  },
}));

// export const useNotificationActions = () => useNotificationStore(state => state.actions);
export const useNotification = () => useNotificationStore(state => state.message);
export default useNotificationStore;