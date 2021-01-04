import React from 'react';

import classNames from 'classnames';
import styles from './index.less';

export type SiteHeaderProps = {
  title: string;
};

const SiteHeader: React.FC<SiteHeaderProps> = (props) => {
  const { title } = props;
  return (
    <div className={classNames(styles.hearerBox)}>
      <div className={classNames(styles.hearerTitle)}>{title}</div>
      <div className={classNames(styles.hearerRight)}>{props.children}</div>
    </div>
  );
};

export default SiteHeader;
