"use client"; // This is a client component 👈🏽

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { userDataInteface } from "@/types/userInterface";
import { useEffect, useRef, useState } from "react";
import { DropDown } from "./dropDown";

export const ChipSelect = () => {
  const [isLastTagHighlighted, setIsLastTagHighlighted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [tags, setTags] = useState<userDataInteface[]>([]);
  const clickOutSideRef = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const removeTag = (tag: userDataInteface) => {
    setTags(tags.filter((value) => value.name !== tag.name));
  };

  const handleTagSelect = (tag: userDataInteface) => {
    setTags((prev) => [...prev, tag]);
    setInputValue("");
  };

  useOnClickOutside(clickOutSideRef, () => setIsInputFocused(false));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace" && isInputFocused) {
        if (isLastTagHighlighted) {
          setTags((prevTags) => prevTags.slice(0, -1));
          setIsLastTagHighlighted(false);
        } else {
          setIsLastTagHighlighted(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInputFocused, isLastTagHighlighted]);

  return (
    <div
      className={`w-[80%]  mt-[10%] flex items-center gap-2 ${
        isInputFocused ? "border-b-2 border-blue-500" : "border-b"
      } p-2 text-[#000000] font-mono text-sm`}
    >
      <div className="flex gap-2  max-w-[80%] flex-wrap">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-[#e1dfdf] px-2 py-1 rounded-full  w-[max-content] whitespace-nowrap"
            style={{
              border:
                isLastTagHighlighted && index === tags.length - 1
                  ? "2px solid red"
                  : "",
            }}
          >
            <span className="flex gap-2 items-center">
              <img
                src={tag.image}
                alt="user-icon"
                className="w-[16px] h-[16px]"
              />
              <p className="text-[12px]">{tag.name}</p>
            </span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-sm rounded-full px-1"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="relative w-[350px] mt-auto" ref={clickOutSideRef}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="flex-1 outline-none  w-[100%] bg-transparent"
          placeholder="Add a tag..."
          onFocus={() => {
            setIsInputFocused(true);
          }}
        />
        {isInputFocused && (
          <DropDown
            handleTagSelect={handleTagSelect}
            inputValue={inputValue}
            tags={tags}
          />
        )}
      </div>
    </div>
  );
};
