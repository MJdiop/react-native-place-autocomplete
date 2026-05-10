import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface SelectedPlace {
  prediction: Prediction;
  details: Details;
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  coordinates: Coordinates;
}

export interface Prediction {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
}

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MainTextMatchedSubstring[];
  secondary_text: string;
}

export interface MainTextMatchedSubstring {
  length: number;
  offset: number;
}

export interface Term {
  offset: number;
  value: string;
}

export interface Details {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  name: string;
  place_id: string;
  types: string[];
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export const EXCLUDED_TYPES = [
  'route',
  'street_address',
  'street_number',
  'intersection',
  'floor',
  'room',
  'parking',
];

export interface PlacesAutocompleteProps extends TextInputProps {
  apiKey: string;
  onSelect: (place: SelectedPlace) => void;
  placeholder?: string;
  minLength: number;
  debounce: number;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  listStyle?: StyleProp<ViewStyle>;
}
