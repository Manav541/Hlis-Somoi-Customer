import {create} from 'zustand';
 
interface Store {
  receiverId: string;
  setReceiverId: (id: string) => void;
}
 
const ChatNotificationStore = create<Store>(set => ({
  receiverId: '',
  setReceiverId(id) {
    set({receiverId: id});
  },
}));
 
export default ChatNotificationStore;