// "use client";
//
// import React, {
//   ChangeEventHandler,
//   FC,
//   FocusEventHandler,
//   KeyboardEventHandler,
//   useState,
// } from "react";
// import "./Input.scss";
//
// import { BaseComponentProps } from "../../types/base";
// import { Button } from "@/src/components/Button/Button";
// import { ButtonType } from "@/src/components/Button/buttonType";
// import block from "bem-cn";
//
// interface Props extends BaseComponentProps {
//   value?: number;
//   onChange?: ChangeEventHandler<HTMLInputElement>;
//   onFocus?: FocusEventHandler<HTMLInputElement>;
//   onBlur?: FocusEventHandler<HTMLInputElement>;
//   onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
//   onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
//   error?: string;
//   placeholder?: string;
//   disabled?: boolean;
//   pattern?: string;
//   type?: string;
//   name?: string;
//   id?: string;
//   endIcon?: React.ReactNode;
//   startIcon?: React.ReactNode;
// }
//
// const b = block("input");
//
// export const Input: FC<Props> = ({
//   className = "",
//   value,
//   onChange = (event: React.ChangeEvent<HTMLInputElement>) => {},
//   onFocus = (event: React.FocusEvent<HTMLInputElement>) => {},
//   onBlur = (event: React.FocusEvent<HTMLInputElement>) => {},
//   onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {},
//   onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {},
//   error = "",
//   placeholder,
//   disabled = false,
//   pattern,
//   type = "number",
//   name,
//   id,
//   endIcon,
//   startIcon,
// }) => {
//   let [currentValue, setCurrentValue] = useState<string | number>("");
//
//   const handlerFocus = (event: React.FocusEvent<HTMLInputElement>) => {
//     event.preventDefault();
//     onFocus(event);
//   };
//
//   const handlerBlur = (event: React.FocusEvent<HTMLInputElement>) => {
//     event.preventDefault();
//     onBlur(event);
//   };
//
//   const handlerKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (["Enter", "NumpadEnter"].includes(event.code)) {
//       onPressEnter(event);
//     }
//     onKeyDown(event);
//   };
//
//   const handlerBtn = (increment?: boolean) => {
//     if (increment) setCurrentValue((prevState) => ++prevState);
//     else setCurrentValue((prevState) => --prevState);
//   };
//
//   return (
//     <div className={b("wrapper")}>
//       <input
//         className={`${b({ error })} ${className}`.trim()}
//         value={currentValue}
//         onChange={(e) => setCurrentValue(e.target.value as number)}
//         pattern={pattern}
//         onFocus={handlerFocus}
//         onBlur={handlerBlur}
//         onKeyDown={handlerKeyDown}
//         placeholder={placeholder}
//         disabled={disabled}
//         type={type}
//         id={id}
//         name={name}
//       ></input>
//       <div className={b("icons")}>
//         <div className={b("icon")}>
//           {startIcon && (
//             <Button
//               onClick={() => handlerBtn(true)}
//               type={ButtonType.Default}
//               startIcon={startIcon}
//             />
//           )}
//         </div>
//         <div className={b("icon")}>
//           {endIcon && (
//             <Button
//               onClick={() => handlerBtn()}
//               type={ButtonType.Default}
//               endIcon={endIcon}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
