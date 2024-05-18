"use client";

import React, {
  ChangeEventHandler,
  Dispatch,
  FC,
  FocusEventHandler,
  KeyboardEventHandler,
  SetStateAction,
  useState,
} from "react";
import "./Input.scss";

import { BaseComponentProps } from "../../types/base";
import { Button } from "@/src/components/Button/Button";
import { ButtonType } from "@/src/components/Button/buttonType";
import block from "bem-cn";
import Image from "next/image";

interface Props extends BaseComponentProps {
  value?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  pattern?: string;
  type?: string;
  name?: string;
  id?: string;
  startHandler?: React.ReactNode;
  endHandler?: React.ReactNode | boolean;
  endHandlerText?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}

const b = block("input");

export const Input: FC<Props> = ({
  value,
  onChange = () => {},
  onFocus = (e: React.FocusEvent<HTMLInputElement>) => {},
  onBlur = (e: React.FocusEvent<HTMLInputElement>) => {},
  placeholder = "Search movie title",
  disabled = false,
  pattern,
  type = "number",
  name,
  id,
  startHandler,
  endHandler,
  endHandlerText,
  setValue,
}) => {
  let [currentValue, setCurrentValue] = useState<string | number>("");

  const handlerFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    onFocus(event);
  };

  const handlerBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    onBlur(event);
  };

  // const handlerKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (["Enter", "NumpadEnter"].includes(event.code)) {
  //     onPressEnter(event);
  //   }
  //   onKeyDown(event);
  // };

  const handlerNumberBtn = (increment?: boolean) => {
    if (increment) setCurrentValue((prevState) => ++prevState);
    else setCurrentValue((prevState) => --prevState);
  };

  if (type === "number") {
    return (
      <div className={b("wrapper")}>
        <input
          className={b()}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value as number)}
          pattern={pattern}
          onFocus={handlerFocus}
          onBlur={handlerBlur}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          id={id}
          name={name}
        />
        <div className={b("icons")}>
          <div className={b("icon")}>
            {startHandler && (
              <Button
                onClick={() => handlerNumberBtn(true)}
                type={ButtonType.Default}
                startIcon={startHandler}
              />
            )}
          </div>
          <div className={b("icon")}>
            {endHandler && (
              <Button
                onClick={() => handlerNumberBtn()}
                type={ButtonType.Default}
                endIcon={endHandler}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className={b("wrapper")}>
        {startHandler && (
          <Image
            className={b("start-handler", { text: true })}
            src={startHandler}
            alt="Search movie"
          />
        )}
        <input
          className={b()}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          pattern={pattern}
          onFocus={handlerFocus}
          onBlur={handlerBlur}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          id={id}
          name={name}
        />
        {endHandler && endHandlerText && (
          <Button
            className={b("button-text-type")}
            onClick={() => setValue && setValue(currentValue)}
            type={ButtonType.Fulfilled}
          >
            {endHandlerText}
          </Button>
        )}
      </div>
    );
  }
};
