const fs = require('fs-extra');
const path = require('path');

const provider = 'context/provider.tsx';
const contentDirectory = 'content';

const layoutsRelative = path.join('src', 'layouts');
const layoutsPath = path.resolve(__dirname, layoutsRelative);

const layoutMap = {
  header: 'header',
  headerMenu: 'header/menu',
  iconLayout: 'icon-menu/layout',
  icons: 'icon-menu',
  bottomIcons: 'icon-menu/bottom',
  leftContextualHeader: 'left-nav/header',
  leftNavigation: 'left-nav',
  leftContextualFooter: 'left-nav/footer',
  leftSidebar: 'left-sidebar',
  contentHeader: 'content/header',
  contentFooter: 'content/footer',
  rightSidebar: 'right-sidebar',
  rightSidebarActions: 'right-sidebar/footer',
  footer: 'footer',
};

(async function main() {
  const layoutData = await Object.keys(layoutMap).reduce(
    async (futureAcc, next) => {
      const acc = await futureAcc;
      const pathToLayout = path.resolve(layoutsPath, layoutMap[next]);
      if (await fs.exists(pathToLayout)) {
        const files = await fs.readdir(pathToLayout); // string[]
        acc.push({
          name: next,
          files: files.map(file => path.join(layoutsRelative, file)),
        });
      }
      return acc;
    },
    []
  );

  console.log(
    layoutData
      .map(d =>
        d.files
          .map(
            (f, k) => `
import ${d.name}_${k} from './${f}';
    `
          )
          .join('\n')
      )
      .join('\n')
  );

  console.log(layoutData);

  // Layout static properties
  // * LayoutTypes                     | MyComponent.LayoutTypes = [ MyLeftSidebar ];
  // * getDefaultContext()             | MyComponent.getDefaultContext = () => ({ selected: 'something' });
  // * PropTypes (except content)      | MyLeftSidebar.PropTypes = { selected: Selected };
  // * Inside layout                   | props.setContext({ selected: '' });
  // * Set content                     | props.setContent('content_name', { ...context });
  //                                   | OR
  //                                   | const { setContent } = useContent();
  //                                   | const [ context, updateContext ] = useLayoutContext(MyLeftSidebar);

  // How this will work.
  // * Possible Webpack plugin, when file in layouts added, or removed
  // * Will create a `.layouts` folder and a generated layout file
  // * Generated layout file will be dynamic based on the file structure.
  // * Transparent to users who want to check it.
  // * `layouts.config.js` file will be loaded at that time, dynamically on each run?
  // * If a `layouts/index.tsx` is provided, this generation will be overridden.
  // * Start with Typescript support, but will allow JS/TS/TSX in the future
  // * Swap out the entry point for the generated layout file.
  // * Will automatically mount to the DOM
  // * Will read in other files.
  // * Will also load in the `src/index.tsx` file from the user.
  // * Generate types that are automatically loaded too. (.layouts/types.d.ts)
  // * CollapseOnNull configuration on layouts (static property?)

  // For each folder.

  // For each layout.
  // - Check contexts
})();
