import { create } from "zustand";

interface Email {
  id: string;
  [key: string]: any;
}

interface GlobalState {
  emails: Email[];
  selectedEmail: Email | null;
  setEmails: (emails: Email[]) => void;
  setSelectedEmail: (email: Email) => void;
}

const useGlobalStateStore = create<GlobalState>((set) => ({
  emails: [],
  selectedEmail: null,
  setEmails: (emails: Email[]) => {
    set(() => ({ emails }));
  },
  setSelectedEmail: (email: Email) => {
    set(() => ({ selectedEmail: email }));
  },
}));

export default useGlobalStateStore;