import React from 'react';
import './RootLayout.scss';

export type RootLayoutProps = {
  header?: JSX.Element;
  footer?: JSX.Element;
};

export const RootLayout: React.FC<RootLayoutProps> = ({
  header,
  footer,
  children,
}) => {
  return (
    <div className="RootLayout">
      {header ? <div className="RootLayout__Header">{header}</div> : null}
      <div className="RootLayout__Content">{children}</div>
      {footer ? <div className="RootLayout__Footer">{footer}</div> : null}
    </div>
  );
};
