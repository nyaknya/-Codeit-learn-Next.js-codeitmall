import { useEffect, useState, useRef } from "react";
import styles from "./Dropdown.module.css";
import arrowImg from "@/public/arrow.svg";
import Image from "next/image";

export default function Dropdown({
  className,
  name,
  value,
  options,
  onChange,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  function handleInputClick() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  function handleBlur() {
    setIsOpen(false);
  }

  // useEffect(() => { TS 2339 에러가 나서 주석 처리함. 나중에 시간이 되면 오류 들여다보기... 해결하다가 시간이 다갈듯
  //   function handleClickOutside(e: MouseEvent) {
  //     const isInside = inputRef.current?.contains(e.target) as any;

  //     if (!isInside) {
  //       setIsOpen(false);
  //     }
  //   }

  //   window.addEventListener("click", handleClickOutside);
  //   return () => {
  //     window.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  const classNames = `${styles.input} ${
    isOpen ? styles.opened : ""
  } ${className}`;
  const selectedOption = options.find((option: any) => option.value === value);

  return (
    <div
      className={classNames}
      onClick={handleInputClick}
      onBlur={handleBlur}
      ref={inputRef}
    >
      {selectedOption.label}
      <Image
        className={styles.arrow}
        src={arrowImg.src}
        width={12}
        height={9}
        alt="▼"
      />
      <div className={styles.options}>
        {options.map((option: any) => {
          const selected = value === option.value;
          const className = `${styles.option} ${
            selected ? styles.selected : ""
          }`;
          return (
            <div
              className={className}
              key={option.value}
              onClick={() => onChange(name, option.value)}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
