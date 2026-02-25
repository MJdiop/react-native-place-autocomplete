import { useState, useRef, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import {
  EXCLUDED_TYPES,
  type PlacesAutocompleteProps,
  type Prediction,
} from './types';

const GOOGLE_PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place/';

const usePlacesAutocomplete = ({
  apiKey,
  minLength = 2,
  debounce = 300,
  onSelect,
}: PlacesAutocompleteProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      if (abortController.current) abortController.current.abort();
    };
  }, []);

  const fetchSuggestions = useCallback(
    async (text: string) => {
      if (text.length < minLength) {
        setSuggestions([]);
        setShowList(false);
        return;
      }

      if (abortController.current) {
        abortController.current.abort();
      }
      abortController.current = new AbortController();

      setLoading(true);

      try {
        const params = new URLSearchParams({
          input: text,
          key: apiKey,
          language: 'fr',
          components: 'country:sn',
        });

        const url = `${GOOGLE_PLACES_API_BASE}autocomplete/json?${params.toString()}`;

        const response = await fetch(url, {
          signal: abortController.current.signal,
        });

        const data = await response.json();

        if (data.status === 'OK' || data.status === 'ZERO_RESULTS') {
          const filtered = (data.predictions || []).filter((p: Prediction) => {
            const types = p.types || [];
            return !types.some((t: string) => EXCLUDED_TYPES.includes(t));
          });
          setSuggestions(filtered);
          setShowList(filtered.length > 0);
        } else {
          console.warn('Google Places API:', data.status, data.error_message);
          setSuggestions([]);
          setShowList(false);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('usePlacesAutocomplete — erreur fetch:', err);
          setSuggestions([]);
          setShowList(false);
        }
      } finally {
        setLoading(false);
      }
    },
    [apiKey, minLength]
  );

  const fetchPlaceDetails = useCallback(
    async (placeId: string) => {
      try {
        const params = new URLSearchParams({
          place_id: placeId,
          key: apiKey,
          language: 'fr',
          fields:
            'place_id,name,formatted_address,geometry,address_components,types',
        });

        const url = `${GOOGLE_PLACES_API_BASE}details/json?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        return data.status === 'OK' ? data.result : null;
      } catch (err) {
        console.log('🚀 ~ usePlacesAutocomplete ~ err:', err);

        return null;
      }
    },
    [apiKey]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      setQuery(text);

      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      if (!text.trim()) {
        setSuggestions([]);
        setShowList(false);
        return;
      }

      debounceTimer.current = setTimeout(() => {
        fetchSuggestions(text);
      }, debounce);
    },
    [debounce, fetchSuggestions]
  );

  const handleSelect = useCallback(
    async (item: Prediction) => {
      setQuery(item.description);
      setSuggestions([]);
      setShowList(false);
      Keyboard.dismiss;

      if (onSelect) {
        const details = await fetchPlaceDetails(item.place_id);
        onSelect({
          prediction: item,
          details,
          placeId: item.place_id,
          description: item.description,
          mainText: item.structured_formatting?.main_text || item.description,
          secondaryText: item.structured_formatting?.secondary_text || '',
          coordinates: details?.geometry?.location ?? null,
        });
      }
    },
    [fetchPlaceDetails, onSelect]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    setSuggestions([]);
    setShowList(false);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    loading,
    showList,
    handleChangeText,
    handleSelect,
    handleClear,
  };
};

export default usePlacesAutocomplete;
