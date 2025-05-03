import { Component, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type

@Component({
  selector: 'app-grid-example',
  imports: [AgGridAngular], // Import AG Grid component
  template: `
    <h2 class="text-2xl font-display mb-4">AG Grid Example</h2>
    <p class="mb-4">Basic AG Grid with Client-Side Data.</p>

    <!-- The AG Grid component -->
    <ag-grid-angular
      style="width: 100%; height: 500px;"
      [rowData]="rowData()"
      [columnDefs]="colDefs()"
      [pagination]="true"
      [paginationPageSize]="10"
      [paginationPageSizeSelector]="[10, 20, 50]"
    >
    </ag-grid-angular>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class GridExampleComponent {
  // Row Data: The data to be displayed. Using a signal for reactivity.
  rowData = signal([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Mercedes', model: 'EQS', price: 104400, electric: true },
    { make: 'BMW', model: 'i4', price: 52200, electric: true },
    // Add more rows...
  ]);

  // Column Definitions: Defines the columns to be displayed. Using a signal.
  colDefs = signal<ColDef[]>([
    { field: 'make', filter: true, sortable: true }, // Enable filtering and sorting
    { field: 'model' },
    {
      field: 'price',
      valueFormatter: (p) => '£' + Math.floor(p.value).toLocaleString(),
    }, // Format price
    { field: 'electric' },
  ]);
}
