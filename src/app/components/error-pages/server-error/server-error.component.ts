import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [NgIf],
  template: `
    <div
      class="flex mt-20 items-center justify-center p-5 w-full"
    >
      <div class="text-center">
        <div class="inline-flex rounded-full bg-red-100 p-4">
          <div class="rounded-full stroke-red-600 bg-red-200 p-4">
            <svg
              class="w-16 h-16"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M17 16L22 21M22 16L17 21"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
        <h1 class="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
          500 - Server error
        </h1>
        <p class="text-slate-600 mt-5 lg:text-lg">
          Oops something went wrong. Try to refresh this page or <br />
          feel free to contact us if the problem presists.
        </p>
        <ng-container *ngIf="error">
          <code class="mt-5" style="background-color: whitesmoke">
            {{ error.details }}
          </code>
        </ng-container>
      </div>
    </div>
  `,
  styles: ``,
})
export class ServerErrorComponent {
  // api exception
  error: any;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }
}
