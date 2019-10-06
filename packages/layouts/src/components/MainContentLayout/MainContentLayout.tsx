import React from 'react';
import './MainContentLayout.scss';

export type MainContentLayoutProps = {
  headers?: Array<JSX.Element>;
  footers?: Array<JSX.Element>;
};

export const MainContentLayout: React.FC<MainContentLayoutProps> = ({
  headers = [],
  footers = [],
  children,
}) => {
  return (
    <div className="MainContentLayout">
      {headers.map((header, key) => (
        <div key={key} className="MainContentLayout__Header">
          {header}
        </div>
      ))}
      <div className="MainContentLayout__Content">{children}</div>
      {footers.map((footer, key) => (
        <div key={key} className="MainContentLayout__Footer">
          {footer}
        </div>
      ))}
    </div>
  );
};
