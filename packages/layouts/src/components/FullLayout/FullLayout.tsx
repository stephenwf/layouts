import React from 'react';
import { RootLayout } from '../RootLayout/RootLayout';
import { HeaderLayout } from '../HeaderLayout/HeaderLayout';
import { ContentLayout } from '../ContentLayout/ContentLayout';
import { LeftNavigationLayout } from '../LeftNavigationLayout/LeftNavigationLayout';
import { RightSidebarLayout } from '../RightSidebarLayout/RightSidebarLayout';
import { MainContentLayout } from '../MainContentLayout/MainContentLayout';

export type FullLayoutProps = {
  header?: JSX.Element;
  headerMenu?: Array<JSX.Element>;
  iconLayout?: (
    icons?: Array<JSX.Element>,
    bottomIcons?: Array<JSX.Element>
  ) => JSX.Element;
  icons?: Array<JSX.Element>;
  bottomIcons?: Array<JSX.Element>;
  leftContextualHeader?: Array<JSX.Element>;
  leftNavigation?: JSX.Element;
  leftContextualFooter?: Array<JSX.Element>;
  leftSidebar?: JSX.Element;
  contentHeader?: Array<JSX.Element>;
  contentFooter?: Array<JSX.Element>;
  rightSidebar?: JSX.Element;
  rightSidebarActions?: Array<JSX.Element>;
  footer?: JSX.Element;
};

export const FullLayout: React.FC<FullLayoutProps> = ({
  header,
  headerMenu,
  iconLayout,
  icons,
  bottomIcons,
  leftContextualHeader,
  leftNavigation,
  leftContextualFooter,
  leftSidebar,
  contentHeader,
  contentFooter,
  rightSidebar,
  rightSidebarActions,
  footer,
  children,
}) => {
  return (
    <RootLayout
      header={
        header ? (
          <HeaderLayout menu={headerMenu}>{header}</HeaderLayout>
        ) : (
          undefined
        )
      }
      footer={footer}
    >
      <ContentLayout
        iconLayout={iconLayout}
        icons={icons}
        bottomIcons={bottomIcons}
        leftNavigation={
          leftNavigation ? (
            <LeftNavigationLayout
              headers={leftContextualHeader}
              footers={leftContextualFooter}
            >
              {leftNavigation}
            </LeftNavigationLayout>
          ) : (
            undefined
          )
        }
        leftSidebar={leftSidebar}
        rightSidebar={
          rightSidebar ? (
            <RightSidebarLayout actions={rightSidebarActions}>
              {rightSidebar}
            </RightSidebarLayout>
          ) : (
            undefined
          )
        }
      >
        <MainContentLayout headers={contentHeader} footers={contentFooter}>
          {children}
        </MainContentLayout>
      </ContentLayout>
    </RootLayout>
  );
};
