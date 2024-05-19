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
  onFocus = (e: React.FocusEvent<HTMLInputElement>) => {},
  onBlur = (e: React.FocusEvent<HTMLInputElement>) => {},
  placeholder = "Search movie title",
  disabled = false,
  pattern,
  type = "number",
  id,
  startHandler,
  endHandler,
  endHandlerText,
  setValue,
}) => {
  let [currentValue, setCurrentValue] = useState<string | number>("");
  let [currentNumValue, setCurrentNumValue] = useState<number | string>("");

  const incrementValue = () => {
    if (currentNumValue < 10) {
      setCurrentNumValue((prevValue) => ++prevValue as number);
    }
  };

  const decrementValue = () => {
    if (currentNumValue > 0) {
      setCurrentNumValue((prevValue) => --prevValue as number);
    }
  };

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

  console.log("currentNumValue", currentNumValue);
  if (type === "number") {
    return (
      <div className={b("wrapper")}>
        <input
          className={b()}
          value={currentNumValue}
          onChange={(e) => setCurrentNumValue(e.target.value as number)}
          pattern={pattern}
          onFocus={handlerFocus}
          onBlur={handlerBlur}
          placeholder={placeholder}
          disabled={disabled}
          type="number"
          min={0}
          max={10}
          id={id}
        />
        <div className={b("icons")}>
          <div className={b("icon")}>
            {startHandler && (
              <Button
                onClick={() => incrementValue()}
                type={ButtonType.Default}
                startIcon={startHandler}
              />
            )}
          </div>
          <div className={b("icon")}>
            {endHandler && (
              <Button
                onClick={() => decrementValue()}
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
          className={b({ text: true })}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          pattern={pattern}
          onFocus={handlerFocus}
          onBlur={handlerBlur}
          placeholder={placeholder}
          disabled={disabled}
          type="text"
          id={id}
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
