import { FC } from 'react';
import styles from './Button.module.scss';

type Props = {
  variant?: 'filled' | 'outlined' | 'fluttened';
  iconUrl?: string;
  text?: string;
  onClick?: () => void;
  icon?: string;
};

const Button: FC<Props> = ({ variant, text, onClick, icon }) => {
  const buttonClass = [
    styles.button,
    variant && styles[`button--${variant}`],
    text ? styles['button--withText'] : styles['button--noText'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClass} onClick={onClick}>
      {icon && <span className={`${styles.button__icon} _icon-${icon}`}></span>}
      {text && (
        <span className={styles.button__text_container}>
          <span className={styles.button__text}>{text}</span>
        </span>
      )}
    </button>
  );
};

export default Button;
