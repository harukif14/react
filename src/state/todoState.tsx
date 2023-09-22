// src/state/todoState.ts
import { atom } from 'recoil';

export const todoListState = atom({
  key: 'todoListState', // 一意のキー
  default: [] as Todo[], // デフォルトの状態
});

export type Todo = {
  inputValue: string;
  id: number;
  checked: boolean;
  removed: boolean;
  addedDate: Date;
  removedDate?: Date;
};
