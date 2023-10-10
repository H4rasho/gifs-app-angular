import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../types/search-response';

@Component({
  selector: 'app-gif-card',
  templateUrl: './gif-card.component.html',
})
export class GifCardComponent implements OnInit {
  @Input() gif!: Gif;

  constructor() { }

  ngOnInit(): void {
    if (!this.gif) throw new Error('gif is required');
  }

}
