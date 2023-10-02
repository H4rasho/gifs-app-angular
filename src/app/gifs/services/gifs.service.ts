import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../types/search-response';

const API_KEY: string = 'mwud1173GE1lzmEfjsLdPULws4Z8JZiA';

const BASE_URL = `https://api.giphy.com/v1/gifs`

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _tagsHistory: string[] = [];
  gifList: Gif[] = [];


  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage();
  }

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
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const tagsHistory = localStorage.getItem('tagsHistory');
    if (!tagsHistory) return
    this._tagsHistory = JSON.parse(tagsHistory);
    if (this._tagsHistory.length > 0) {
      this.searchTag(this._tagsHistory[0]);
    }
  }


  public searchTag(tag: string) {
    if (!tag.trim()) return

    this.organizeTagsHistory(tag);

    const params = new HttpParams()
      .set('api_key', API_KEY)
      .set('q', tag)
      .set('limit', '10');





    this.http.get<SearchResponse>(`${BASE_URL}/search`, {
      params
    }).subscribe(res => {
      this.gifList = res.data;
    });

  }
}
