import {
  Component,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
  ViewChild,
  type OnInit,
  type OnDestroy,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgClass } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule, // for routerLink
    RouterOutlet, // for nested routes
    AsyncPipe, // for BreakpointObserver observable
    NgClass, // for conditional classes

    // Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush for performance
})
export class LayoutComponent implements OnInit, OnDestroy {
  // --- Dependencies ---
  private breakpointObserver = inject(BreakpointObserver);
  private destroy$ = new Subject<void>();

  // --- Signals for State ---
  // Use signals for managing state reactively
  readonly #isHandset = signal(false);
  readonly #isTablet = signal(false);
  readonly #isDesktop = signal(true); // Assume desktop default

  // Computed signal to determine if the bottom toolbar should be shown
  readonly showBottomToolbar = computed(
    () => this.#isHandset() || this.#isTablet()
  );

  // Sidenav references (needed for toggling)
  @ViewChild('leftSidenav') leftSidenav!: MatSidenav;
  @ViewChild('rightSidenav') rightSidenav!: MatSidenav;

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.Handset,
        Breakpoints.Tablet,
        Breakpoints.Web, // Or specific desktop breakpoints like XLarge, Large, Medium
      ])
      .pipe(
        map((result) => {
          this.#isHandset.set(result.breakpoints[Breakpoints.Handset]);
          this.#isTablet.set(result.breakpoints[Breakpoints.Tablet]);
          // Consider Web/Desktop true if neither Handset nor Tablet match
          this.#isDesktop.set(
            !result.breakpoints[Breakpoints.Handset] &&
              !result.breakpoints[Breakpoints.Tablet]
          );

          // Optional: Close sidenavs when changing layout if desired
          if (this.leftSidenav?.opened) this.leftSidenav.close();
          if (this.rightSidenav?.opened) this.rightSidenav.close();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // --- Methods ---
  toggleLeftSidenav(): void {
    this.leftSidenav.toggle();
  }

  toggleRightSidenav(): void {
    this.rightSidenav.toggle();
  }

  // Example theme toggler (implement ThemeService later)
  toggleTheme(): void {
    // TODO: Implement ThemeService to toggle dark mode
    console.log('Toggle theme clicked');
    document.body.classList.toggle('dark-theme'); // Basic toggle for now
    // Also toggle tailwind dark class if different root element used
    // document.documentElement.classList.toggle('dark'); // if darkMode: 'class' is on <html>
  }
}
