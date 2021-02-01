export interface ButtonProps {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}
