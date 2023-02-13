import React from "react";
import styles from "./input.module.css";
import {declination} from "../../../utils/utils";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
  extraClass?: string;
  isLimitText?: boolean;
  testData?: undefined | string;
}

export const Input: React.FC<InputProps> = ({
  placeholder = "Введите текст",
  extraClass = "",
  type = "text",
  maxLength,
  max,
  isLimitText = false,
  testData = undefined,
  ...rest
}) => {
  const limitText =
    type === "text"
      ? `Максимум — ${maxLength} ${declination(maxLength)}`
      : `Максимальное число — ${max}`;

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input
        className={`${styles.input} text text_type_input text_color_input`}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        max={max}
        data-test={testData ? testData : 'input'}
        {...rest}
      />
      {isLimitText && (
        <span
          className={`text text_type_input-lim text_color_input mt-2 ml-8 ${styles.limit}`}
        >
          {limitText}
        </span>
      )}
    </div>
  );
};
