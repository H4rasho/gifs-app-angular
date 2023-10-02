import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const API_KEY: string = 'mwud1173GE1lzmEfjsLdPULws4Z8JZiA';

const BASE_URL = `https://api.giphy.com/v1/gifs`

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _tagsHistory: string[] = [];


  constructor(
    private http: HttpClient
  ) { }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeTagsHistory(tag: string) {
    tag = tag.trim().toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0, 10);
  }


  public searchTag(tag: string) {
    if (!tag.trim()) return

    this.organizeTagsHistory(tag);

    const params = new HttpParams()
      .set('api_key', API_KEY)
      .set('q', tag)
      .set('limit', '10');





    this.http.get(`${BASE_URL}/search`, {
      params
    }).subscribe(res => console.log(res));

  }
}
