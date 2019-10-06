import * as React from 'react';
import './IconLayout.scss';

export type IconLayoutProps = {
  topIcons?: Array<JSX.Element>;
  bottomIcons?: Array<JSX.Element>;
};

export const IconLayout: React.FC<IconLayoutProps> = ({
  topIcons = [],
  bottomIcons = [],
}) => {
  if (!topIcons || !bottomIcons) return <React.Fragment />;

  return (
    <div className="IconLayout">
      {topIcons.map((icon, key) => (
        <div key={key} className="IconLayout__TopIcon">
          {icon}
        </div>
      ))}
      <div className="IconLayout__Spacer" />
      {bottomIcons.map((icon, key) => (
        <div key={key} className="IconLayout__BottomIcon">
          {icon}
        </div>
      ))}
    </div>
  );
};
