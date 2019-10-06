import React from 'react';
import './ContentLayout.scss';
import { IconLayout } from '../IconLayout/IconLayout';

export type ContentLayoutProps = {
  iconLayout?: (
    icons?: Array<JSX.Element>,
    bottomIcons?: Array<JSX.Element>
  ) => JSX.Element;
  icons?: Array<JSX.Element>;
  bottomIcons?: Array<JSX.Element>;
  leftNavigation?: JSX.Element;
  leftSidebar?: JSX.Element;
  rightSidebar?: JSX.Element;
};

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  iconLayout,
  icons,
  bottomIcons,
  leftNavigation,
  leftSidebar,
  children,
  rightSidebar,
}) => {
  return (
    <div className="ContentLayout">
      {icons || bottomIcons || iconLayout ? (
        <div className="ContentLayout__IconMenu">
          {iconLayout ? (
            iconLayout(icons, bottomIcons)
          ) : (
            <IconLayout topIcons={icons} bottomIcons={bottomIcons} />
          )}
        </div>
      ) : null}
      {leftNavigation ? (
        <div className="ContentLayout__LeftNavigation">{leftNavigation}</div>
      ) : null}
      {leftSidebar ? (
        <div className="ContentLayout__LeftSidebar">{leftSidebar}</div>
      ) : null}
      <div className="ContentLayout__MainContent">{children}</div>
      {rightSidebar ? (
        <div className="ContentLayout__RightSidebar">{rightSidebar}</div>
      ) : null}
    </div>
  );
};
