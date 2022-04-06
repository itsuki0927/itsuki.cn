import { MouseEvent } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import styles from './style.module.scss';

interface FavoriteButtonProps {
  liking?: number;
  isLike?: boolean;
  onLike?: () => void;
}

const FavoriteButton = ({ isLike, liking, onLike }: FavoriteButtonProps) => {
  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    if (isLike) return;
    e.preventDefault();

    const button = e.currentTarget;

    if (button.classList.contains(styles.animated)) {
      return;
    }
    button.classList.add(styles.animated);

    gsap.to(button, {
      keyframes: [
        {
          '--star-y': '-36px',
          duration: 0.3,
          ease: 'power2.out',
        },
        {
          '--star-y': '48px',
          '--star-scale': 0.4,
          duration: 0.325,
          onStart() {
            button.classList.add(styles['star-round']);
          },
        },
        {
          '--star-y': '-64px',
          '--star-scale': 1,
          duration: 0.45,
          ease: 'power2.out',
          onStart() {
            button.classList.toggle(styles.active);
            setTimeout(() => button.classList.remove(styles['star-round']), 100);
          },
        },
        {
          '--star-y': '0px',
          duration: 0.45,
          ease: 'power2.in',
        },
        {
          '--button-y': '3px',
          duration: 0.11,
        },
        {
          '--button-y': '0px',
          '--star-face-scale': 0.65,
          duration: 0.125,
        },
        {
          '--star-face-scale': 1,
          duration: 0.15,
        },
      ],
      clearProps: true,
      onComplete() {
        button.classList.remove(styles.animated);
        onLike?.();
      },
    });

    gsap.to(button, {
      keyframes: [
        {
          '--star-hole-scale': 0.8,
          duration: 0.5,
          ease: 'elastic.out(1, .75)',
        },
        {
          '--star-hole-scale': 0,
          duration: 0.2,
          delay: 0.2,
        },
      ],
    });

    gsap.to(button, {
      '--star-rotate': '360deg',
      duration: 1.55,
      clearProps: true,
    });
  };

  return (
    <button
      type='button'
      className={classNames(styles['favorite-button'], {
        [styles.active]: isLike,
      })}
      onClick={handleLike}
    >
      <div className={styles.icon}>
        <div className={styles.star} />
      </div>
      <span>
        <strong>{liking}</strong> 人喜欢
      </span>
    </button>
  );
};

export default FavoriteButton;
