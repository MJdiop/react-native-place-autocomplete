import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';

import usePlacesAutocomplete from './usePlacesAutocomplete';
import type { PlacesAutocompleteProps, Prediction } from './types';

export const PlacesAutocomplete = ({
  apiKey,
  onSelect,
  placeholder,
  minLength,
  debounce,
  containerStyle,
  inputStyle,
  listStyle,
}: PlacesAutocompleteProps) => {
  const {
    query,
    suggestions,
    loading,
    showList,
    handleChangeText,
    handleSelect,
    handleClear,
  } = usePlacesAutocomplete({ apiKey, minLength, debounce, onSelect });

  const highlightText = (text: string, highlight: string) => {
    if (!highlight || !text) return <Text>{text}</Text>;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={i} style={styles.highlighted}>
              {part}
            </Text>
          ) : (
            <Text key={i}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  const renderItem = ({ item }: { item: Prediction }) => {
    const mainText = item.structured_formatting?.main_text || '';
    const secondaryText = item.structured_formatting?.secondary_text || '';
    return (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => handleSelect(item)}
        activeOpacity={0.7}
      >
        <View style={styles.pinIcon}>
          <Text style={styles.pinEmoji}>📍</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.mainText} numberOfLines={1}>
            {highlightText(mainText, query)}
          </Text>
          {secondaryText ? (
            <Text style={styles.secondaryText} numberOfLines={1}>
              {secondaryText}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <View style={[styles.container, containerStyle]}>
        <View style={styles.inputWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.input, inputStyle]}
            value={query}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            autoCorrect={false}
            autoComplete="off"
            returnKeyType="search"
          />
          {loading && (
            <ActivityIndicator
              size="small"
              color="#10B981"
              style={styles.loader}
            />
          )}
          {!loading && query.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {showList && (
          <View style={[styles.list, listStyle]}>
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.place_id}
              renderItem={renderItem}
              keyboardShouldPersistTaps="handled"
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', zIndex: 999 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    height: 52,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, fontSize: 15, color: '#111827', paddingVertical: 0 },
  loader: { marginLeft: 8 },
  clearBtn: { padding: 4, marginLeft: 4 },
  clearIcon: { fontSize: 14, color: '#9CA3AF' },
  list: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    marginTop: 6,
    maxHeight: 280,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: { elevation: 5 },
    }),
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  pinIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  pinEmoji: { fontSize: 16 },
  textContainer: { flex: 1 },
  mainText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  secondaryText: { fontSize: 12, color: '#6B7280' },
  highlighted: { color: '#10B981', fontWeight: '700' },
  separator: { height: 1, backgroundColor: '#F3F4F6', marginHorizontal: 14 },
});

export type {
  PlacesAutocompleteProps,
  Prediction,
  SelectedPlace,
} from './types';
