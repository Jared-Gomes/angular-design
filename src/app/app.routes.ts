import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component'; // Import layout component

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Use LayoutComponent as the base for these routes
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default route
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        title: 'Dashboard', // Set page title
      },
      {
        path: 'grid-example',
        loadComponent: () =>
          import('./grid-example/grid-example.component').then(
            (m) => m.GridExampleComponent
          ),
        title: 'AG Grid Example',
      },
      // Add other routes here
    ],
  },
  // Optional: Add routes that do NOT use the main layout (e.g., login page)
  // { path: 'login', loadComponent: () => ... }

  // Wildcard route for 404 - place last
  { path: '**', redirectTo: 'dashboard' }, // Or create a dedicated NotFoundComponent
];
