import { userDataInteface } from "./userInterface";

export interface DropDownPropsType {
  handleTagSelect: (tag: userDataInteface) => void;
  inputValue: string;
  tags: userDataInteface[];
}
