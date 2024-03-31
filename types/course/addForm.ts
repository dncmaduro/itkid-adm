import type { ICategory } from "../category/category";

export type IAddCourse = {
  category: ICategory;
  name: string;
  fee: number;
  image: string;
};
