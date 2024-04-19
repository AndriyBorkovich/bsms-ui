import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  template: `
    <div
      class="mt-20 flex flex-grow items-center justify-center"
    >
      <div class="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 class="mb-4 text-4xl font-bold">401</h1>
        <p class="text-gray-600">
          Oops! You do not have access to this part of cite.
        </p>
        <a
          routerLink="/"
          class="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Register or log in
        </a>
      </div>
    </div>
  `,
  styles: ``,
})
export class UnauthorizedComponent {}
