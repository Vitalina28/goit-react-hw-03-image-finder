import css from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={css.btn}>
      <button className={css.Button} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
