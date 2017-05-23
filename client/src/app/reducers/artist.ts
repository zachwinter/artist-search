import { Action } from '@ngrx/store';
import { Artist } from '../models/artist';
import { Tag } from '../models/tags';
import { SimilarArtist } from '../models/similar-artist';

import * as _ from 'lodash';

export interface ArtistState {
  artist: Artist;
  tags: Tag[];
  similar: SimilarArtist[];
  filtered: SimilarArtist[];
  isFiltered: boolean;
  genre: string;
}

export const initialState: ArtistState = {
  artist: undefined,
  tags: [],
  similar: [],
  filtered: [],
  isFiltered: false,
  genre: ''
}

export function artistReducer(state: ArtistState = initialState, action: Action): ArtistState {
  switch (action.type) {
    case 'SELECT_ARTIST':
      return {
        artist: action.payload,
        tags: state.tags,
        similar: state.similar,
        filtered: state.filtered,
        isFiltered: false,
        genre: ''
      }

    case 'SAVE_TAG':
      return {
        artist: state.artist,
        tags: [...state.tags, action.payload],
        similar: state.similar,
        filtered: state.filtered,
        isFiltered: false,
        genre: state.genre
      }

    case 'SAVE_SIMILAR_ARTIST':
      return {
        artist: state.artist,
        tags: state.tags,
        similar: [...state.similar, action.payload],
        filtered: state.filtered,
        isFiltered: false,
        genre: ''
      }

    case 'FILTER_SIMILAR_ARTISTS':
      let filtered = _.filter(state.similar, (artist) => {
        let tag = _.find(artist.tags, { name: action.payload });

        if (tag) return tag.count > 50;
      })

      return {
        artist: state.artist,
        tags: state.tags,
        similar: state.similar,
        filtered: filtered,
        isFiltered: true,
        genre: action.payload
      }

    case 'CLEAR_SIMILAR_ARTISTS':
      return {
        artist: state.artist,
        tags: state.tags,
        similar: [],
        filtered: state.filtered,
        isFiltered: false,
        genre: ''
      }
  }
}