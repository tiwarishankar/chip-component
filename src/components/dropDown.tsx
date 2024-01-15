import { DropDownPropsType } from "@/types/propsInterface";
import { usersData } from "@/utils/data";

export const DropDown = ({
  handleTagSelect,
  inputValue,
  tags,
}: DropDownPropsType) => {
  const removeSelectedUsers = usersData.filter(
    (user) => !tags.some((tag) => tag.name === user.name)
  );
  const filteredUsersData = removeSelectedUsers.filter((user) =>
    user.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="absolute top-8 w-[100%] bg-[#ffffff] shadow-lg border border-[#e1dfdf] max-h-[350px] overflow-y-scroll ">
      {filteredUsersData.map((tag, index) => (
        <div
          key={index}
          className="flex cursor-pointer p-2 hover:bg-[#e1dfdf] justify-between gap-2 items-center"
          onClick={() => handleTagSelect(tag)}
        >
          <span className="flex gap-2 items-center">
            <img
              src={tag.image}
              alt="user-icon"
              className="w-[16px] h-[16px]"
            />
            <p className="text-[12px]">{tag.name}</p>
          </span>
          <p className="text-[10px]">{tag.email}</p>
        </div>
      ))}
    </div>
  );
};
