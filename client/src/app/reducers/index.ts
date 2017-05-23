import * as fromArtist from './artist';

export interface AppState {
  artist: fromArtist.ArtistState
}
export const reducers = {
  artist: fromArtist.artistReducer
}