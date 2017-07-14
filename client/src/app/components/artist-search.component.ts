import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/';
import { ArtistState } from '../reducers/artist';
import { LoadingState } from '../reducers/loading';
import { APIService} from '../services/api.service';

@Component({
  selector: 'artist-search',
  template: `
  
  <aside class="artist" [@fade]="'visible'">
    <form #search="ngForm" (ngSubmit)="getArtist(search.value.artist)" [@fade]="'visible'" *ngIf="!loading.isLoading">
      <input type="text" [ngModel]="selectedArtist" name="artist" placeholder="Search for an artist." autocomplete="off" />    
      <button type="submit"><i class="loading" fa [name]="'search'"></i></button>
    </form>
  
    <div class="image-container" *ngIf="state.artist">
      <img src="{{state.artist.images[4]}}" alt="Grimes" />
    </div>
    
    <div class="text" *ngIf="state.artist">
      <h1>{{state.artist.name}}</h1>
      <p><span class="tag" *ngFor="let tag of state.artist?.tags">{{tag}} </span></p>      
    </div>
  </aside>
  
  <section class="similar-artists" [@fade]="'visible'" *ngIf="state.artist">
    <form #filter="ngForm">
      <input type="text" (keyup)="filterArtists(filter.value.genre)" ngModel name="genre" placeholder="Filter by genre." autocomplete="off" />    
      <button type="submit"><i class="loading" fa [name]="'search'"></i></button>
    </form>
    
    <ul *ngIf="!state.isFiltered">
      <li *ngFor="let artist of state.similar" (click)="getArtist(artist.name)">
        <img src="{{artist.image[2]['#text']}}" alt="{{artist.name}}" />
        <p>{{artist.name}}</p>
      </li>
    </ul>
    
    <ul *ngIf="state.isFiltered">
      <li *ngFor="let artist of state.filtered" (click)="getArtist(artist.name)">
        <img src="{{artist.image[2]['#text']}}" alt="{{artist.name}}" />
        <p>{{artist.name}}</p>
      </li>
      
      <p class="no-results" *ngIf="state.filtered.length == 0">0 results for "{{state.genre}}"</p>
    </ul>
  </section>
        
  `,
  styleUrls: ['./artist-search.component.scss'],
  animations: [
    trigger('fade', [
      state('visible', style({ opacity: 1 })),

      transition(':enter', [
        style({ opacity: 0 }),
        animate(150)
      ]),

      transition(':leave', [
        animate(150, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ArtistSearchComponent implements OnInit {
  public state: ArtistState;
  public loading: LoadingState;
  public selectedArtist: string = '';

  constructor(
    private _store: Store<AppState>,
    private _api: APIService
  ) {}

  getArtist(artist: string): void {
    this._store.dispatch({ type: 'LOADING' });
    this._store.dispatch({ type: 'RESET_ARTIST' });

    this._api.getArtist(artist)
      .then((response: any) => {
        this._store.dispatch({ type: 'SELECT_ARTIST', payload: response.artist });
        this._store.dispatch({ type: 'SAVE_SIMILAR_ARTISTS', payload: response.similarArtists });
        this._store.dispatch({ type: 'LOADING_COMPLETE' });
      })
  }

  filterArtists(genre: string): void {
    console.log(genre)
    this._store.dispatch({ type: 'FILTER_SIMILAR_ARTISTS', payload: genre })
  }

  ngOnInit(): void {
    this._store.select('artist')
      .subscribe((state: ArtistState) => {
        this.state = state;
        this.selectedArtist = state.artist ? state.artist.name : '';
      })

    this._store.select('loading')
      .subscribe((state: LoadingState) => this.loading = state)
  }
}
