import React, { Dispatch, FC, SetStateAction } from "react";
import Select, { OptionProps } from "react-select";
import "./Selector.scss";
import { BaseComponentProps } from "@/src/types/base";

interface CustomSelectProps extends BaseComponentProps {
  options: OptionProps[];
  value: OptionProps;
  onChange: Dispatch<SetStateAction<OptionProps>>;
  placeholder: string;
  ref?: any;
  onMenuScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
  onMenuScrollToTop?: (event: WheelEvent | TouchEvent) => void;
}

const CustomSelect: FC<CustomSelectProps> = ({
  options,
  onChange,
  placeholder,
  value,
  onMenuScrollToBottom,
  onMenuScrollToTop,
  className,
}) => {
  return (
    <div className="customSelect">
      <Select
        className={className}
        onMenuScrollToTop={onMenuScrollToTop}
        onMenuScrollToBottom={onMenuScrollToBottom}
        onChange={onChange}
        value={value}
        options={options}
        placeholder={placeholder}
        theme={(theme) => ({
          ...theme,
          borderRadius: 8,
          colors: {
            ...theme.colors,
            primary25: "rgba(253,0,243,0.37)",
            primary: "rgba(253,0,243,0.37)",
          },
        })}
      />
    </div>
  );
};

export default CustomSelect;
