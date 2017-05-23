import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { AppState } from '../reducers';
import { Artist } from '../models/artist';
import { SimilarArtist } from '../models/similar-artist';
import { Tag, Tags } from '../models/tags';

import 'rxjs/Rx';

@Injectable()
export class APIService {
  private api: string = 'API_URL_HERE';

  constructor(
    private _http: Http,
    private _store: Store<AppState>
  ) {}

  public getArtist(artist: string): void {
    this._http.get(this.api + '/artist/' + artist)
      .map(response => response.json())
      .subscribe((res: Artist) => {
        this._store.dispatch({ type: 'SELECT_ARTIST', payload: res })
      })
  }

  public getSimilarArtists(artist: string): void {
    this._http.get(this.api + '/artist/' + artist + '/similar')
      .map(response => response.json())
      .subscribe((similarArtists: any) => {
        this._store.dispatch({ type: 'CLEAR_SIMILAR_ARTISTS' });

        similarArtists.artist.forEach((similarArtist: SimilarArtist) => {
          this._http.get(this.api + '/artist/' + similarArtist.name + '/tags')
            .map(response => response.json())
            .subscribe((tags: Tags) => {
              similarArtist.tags = tags.tag;

              this._store.dispatch({ type: 'SAVE_SIMILAR_ARTIST', payload: similarArtist })
            })
        })
      })
  }
}