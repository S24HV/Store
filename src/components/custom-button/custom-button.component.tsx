import { ButtonHTMLAttributes, FC } from "react";

import "./custom-button.scss";

export type ButtonProps = {
  isLoading?: boolean;
  color?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton: FC<ButtonProps> = ({ children, color, ...otherProps }) => {
  return (
    <button
      className={`base-button ${color ? `base-button--${color}` : ""}`}
      {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;
