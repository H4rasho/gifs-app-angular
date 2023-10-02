import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../types/search-response';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor(
    private gifsService: GifsService
  ) { }

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

}
