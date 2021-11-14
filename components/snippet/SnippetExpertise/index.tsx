import classNames from 'classnames';
import { RanksState } from '../SnippetCard';
import styles from './style.module.scss';

interface SnippetExpertiseProps {
  ranks: RanksState;
}
const SnippetExpertise = ({ ranks }: SnippetExpertiseProps) => (
  <i
    className={classNames(styles.expertise, {
      [styles.easy]: ranks === RanksState.Easy,
      [styles.medium]: ranks === RanksState.Medium,
      [styles.hard]: ranks === RanksState.Hard,
    })}
  />
);

export default SnippetExpertise;
