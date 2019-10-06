import React from 'react';
import './LeftNavigationLayout.scss';

export type LeftNavigationLayoutProps = {
  headers?: Array<JSX.Element>;
  footers?: Array<JSX.Element>;
};

export const LeftNavigationLayout: React.FC<LeftNavigationLayoutProps> = ({
  headers = [],
  children,
  footers = [],
}) => {
  return (
    <div className="LeftNavigationLayout">
      {headers.map((header, key) => (
        <div key={key} className="LeftNavigationLayout__ContextualHeader">
          {header}
        </div>
      ))}
      <div className="LeftNavigationLayout__NavigationBody">{children}</div>
      {footers.map((footer, key) => (
        <div key={key} className="LeftNavigationLayout__ContextualFooter">
          {footer}
        </div>
      ))}
    </div>
  );
};
