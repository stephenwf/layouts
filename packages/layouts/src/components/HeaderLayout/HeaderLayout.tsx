import React from 'react';
import './HeaderLayout.scss';

export type HeaderLayoutProps = {
  menu?: Array<JSX.Element>;
};

export const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  children,
  menu = [],
}) => {
  return (
    <div className="HeaderLayout">
      <div className="HeaderLayout__MainHeader">{children}</div>
      {menu.map((single, key) => (
        <div key={key} className="HeaderLayout__Menu">
          {single}
        </div>
      ))}
    </div>
  );
};
