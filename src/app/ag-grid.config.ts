import { provideGlobalGridOptions, themeQuartz } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

const theme = themeQuartz
  .withParams(
    {
      browserColorScheme: 'dark',
      columnBorder: true,
      oddRowBackgroundColor: '#19202B',
    },
    'dark'
  )
  .withParams(
    {
      browserColorScheme: 'light',
      columnBorder: true,
      oddRowBackgroundColor: '#FAFAFA',
    },
    'light'
  );

export const provideAgGridConfig = () => {
  // Register all Community features
  ModuleRegistry.registerModules([AllCommunityModule]);

  provideGlobalGridOptions({
    theme,
  });
};
