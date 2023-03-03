import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

export const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: ITodo, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [
      { id: 1677841331790, text: "설거지" },
      { id: 1677841330766, text: "청소" },
    ],
    Doing: [{ id: 1677841337625, text: "빨래하기" }],
    Done: [],
  },
  effects: [localStorageEffect("todo")],
});
