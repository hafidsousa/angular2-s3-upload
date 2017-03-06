import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'about',
    template: `
    <h1>About</h1>
    <div>
      <h3>
        <p>Hafid F Sousa</p>
        <p> <a href="mailto:hsousa@lambdas.io?subject=Angular S3 Upload ">Email Me</a></p>
      </h3>
    </div>
  `
})
export class AboutComponent implements OnInit {

    constructor() {
    }

    public ngOnInit() {

        console.log('hello `About` component');
    }
}
