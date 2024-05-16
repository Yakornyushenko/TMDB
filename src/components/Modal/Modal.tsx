import React, { FC, SetStateAction } from "react";
import Image from "next/image";
import close from "@/public/icons/close.png";
import "./Modal.scss";
import block from "bem-cn";

const b = block("modal");

export interface BaseModalProps {
  modalTitle: string;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export const Modal: FC<BaseModalProps> = ({
  setIsOpen,
  modalTitle,
  children,
}) => {
  return (
    <div className={b("wrapper")}>
      <div className={b()}>
        <div className={b("header")}>
          <p className={b("title")}>{modalTitle}</p>
          <Image
            className={b("close")}
            onClick={() => setIsOpen(false)}
            src={close}
            alt={"Close"}
          />
        </div>

        <div className={b("body")}>{children}</div>
      </div>
    </div>
  );
};
