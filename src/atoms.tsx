import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "Todo",
  "DOING" = "Doing",
  "DONE" = "Done",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories | string;
}

export const customCategoriesState = atom<string[]>({
  key: "customCategories",
  default: [],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoriesSelector = selector({
  key: "categoriesSelector",
  get: ({ get }) => {
    const customCategories = get(customCategoriesState);
    return [...Object.values(Categories), ...customCategories];
  },
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
