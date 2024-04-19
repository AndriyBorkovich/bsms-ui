import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div
      class="mt-20 flex flex-grow items-center justify-center bg-gray-50"
    >
      <div class="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 class="mb-4 text-4xl font-bold">404</h1>
        <p class="text-gray-600">
          Oops! The page you are looking for could not be found.
        </p>
        <a
          routerLink="/"
          class="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Go back to Home
        </a>
      </div>
    </div>
  `,
  styles: [],
  imports: [
    RouterLink
  ]
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
