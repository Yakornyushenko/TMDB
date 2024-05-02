"use client";
import React, { FC } from "react";
import { BaseComponentProps } from "../../types/base";
import "./button.scss";
import { ButtonType } from "./ButtonType";
import block from "bem-cn";

interface Props extends BaseComponentProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: string;
  htmlType?: "submit" | "reset" | "button";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  contentStart?: boolean;
}

const b = block("button");

export const Button: FC<Props> = ({
  className = "",
  style,
  onClick = () => {},
  type = ButtonType.Hovered,
  htmlType,
  disabled = false,
  startIcon,
  endIcon,
  children,
  contentStart,
}) => (
  <button
    className={`${b({ [type]: true, flexStart: contentStart })} ${className}`.trim()}
    onClick={onClick}
    disabled={disabled}
    style={style}
    type={htmlType}
  >
    {startIcon && <div className={b("icon")}>{startIcon}</div>}
    <span>{children}</span>
    {endIcon && <div className={b("icon", { end: true })}>{endIcon}</div>}
  </button>
);
