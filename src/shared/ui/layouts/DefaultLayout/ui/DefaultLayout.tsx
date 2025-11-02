import { App } from '@pages/App';
import styles from './styles.module.css';
import { Navigation } from '@widgets/Navigation';

export const DefaultLayout = () => {
  return (
    <main>
      <div className={styles.wrapper}>
        {/* <Sidebar /> */}
        <div className="flex h-screen min-w-0 flex-1 flex-col gap-2 px-4 pt-2 pb-5 md:px-10 md:py-5">
          <Navigation />
          <div>{<App />}</div>
        </div>
      </div>
    </main>
  );
};
