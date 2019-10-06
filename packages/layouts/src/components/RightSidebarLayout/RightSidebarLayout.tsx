import React from 'react';
import './RightSidebarLayout.scss';

export type RightSidebarLayoutProps = {
  actions?: Array<JSX.Element>;
};

export const RightSidebarLayout: React.FC<RightSidebarLayoutProps> = ({
  actions = [],
  children,
}) => {
  return (
    <div className="RightSidebarLayout">
      <div className="RightSidebarLayout__Content">{children}</div>
      {actions.map((action, key) => (
        <div key={key} className="RightSidebarLayout__Actions">
          {action}
        </div>
      ))}
    </div>
  );
};
