import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input() url!: string;
  @Input() alt?: string;
  @Input() width!: string;
  @Input() height!: string;

  public hasLoaded: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (!this.url) throw new Error('url is required');
    if (!this.width) throw new Error('width is required');
    if (!this.height) throw new Error('height is required');
  }

  onLoad(): void {
    this.hasLoaded = true;
  }

}
