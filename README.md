# react-native-place-autocomplete

lightweight React native google place autocomplete

## Demo

https://github.com/user-attachments/assets/1ffb962e-9793-42a9-bd2e-65ea9904850e

## Installation

```sh
yarn add react-native-place-autocomplete
```

## Usage

```tsx
import { View, StyleSheet, Text } from 'react-native';
import {
  PlacesAutocomplete,
  type SelectedPlace,
} from 'react-native-place-autocomplete';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function App() {
  const [result, setResult] = useState<SelectedPlace | null>(null);

  const onSelect = (place: SelectedPlace) => {
    setResult(place);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <PlacesAutocomplete
            apiKey={'YOUR_API_KEY'}
            onSelect={onSelect}
            placeholder="Adresse..."
            minLength={2}
            debounce={300}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginTop: 40,
    marginHorizontal: 20,
  },
});
```

# Props Documentation

## Overview

The `PlacesAutocomplete` component provides an autocomplete control for place searching using the Google Places API. Here is the detailed documentation of all available props.

---

## Required Props

### `apiKey`

- **Type:** `string`
- **Required:** ✅ Yes
- **Description:** Authentication key for the Google Places API. This key is necessary to access autocomplete and place details services.
- **Example:**
  ```tsx
  <PlacesAutocomplete apiKey="YOUR_GOOGLE_PLACES_API_KEY" />
  ```

### `onSelect`

- **Type:** `(place: SelectedPlace) => void`
- **Required:** ✅ Yes
- **Description:** Callback function called when the user selects a place from the suggestions list.
- **`SelectedPlace` Parameter:**
  - `prediction: Prediction` - The prediction data of the place
  - `details: Details` - Complete details of the place
  - `placeId: string` - The unique identifier of the place
  - `description: string` - Description of the place
  - `mainText: string` - Formatted main text
  - `secondaryText: string` - Secondary text (usually region/state)
  - `coordinates: { lat: number; lng: number }` - GPS coordinates of the place
- **Example:**
  ```tsx
  <PlacesAutocomplete
    onSelect={(place) => {
      console.log('Selected place:', place);
      console.log('Coordinates:', place.coordinates);
    }}
  />
  ```

### `minLength`

- **Type:** `number`
- **Required:** ✅ Yes
- **Description:** Minimum number of characters the user must enter before the search is triggered.
- **Default value:** `2`
- **Example:**
  ```tsx
  <PlacesAutocomplete minLength={3} />
  ```

### `debounce`

- **Type:** `number`
- **Required:** ✅ Yes
- **Description:** Delay in milliseconds before performing the search after the user stops typing. This helps reduce the number of API requests.
- **Default value:** `300`
- **Example:**
  ```tsx
  <PlacesAutocomplete debounce={500} />
  ```

---

## Optional Style Props

### `containerStyle`

- **Type:** `StyleProp<ViewStyle>`
- **Required:** ❌ No
- **Description:** Custom style for the main container of the component.
- **Example:**
  ```tsx
  <PlacesAutocomplete containerStyle={{ padding: 16, marginTop: 10 }} />
  ```

### `inputContainerStyle`

- **Type:** `StyleProp<ViewStyle>`
- **Required:** ❌ No
- **Description:** Custom style for the input container (wrapper containing the left icon, input, and right icon).
- **Example:**
  ```tsx
  <PlacesAutocomplete
    inputContainerStyle={{
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
    }}
  />
  ```

### `inputStyle`

- **Type:** `StyleProp<TextStyle>`
- **Required:** ❌ No
- **Description:** Custom style for the TextInput field.
- **Example:**
  ```tsx
  <PlacesAutocomplete
    inputStyle={{
      fontSize: 16,
      color: '#333',
      paddingVertical: 10,
    }}
  />
  ```

### `listStyle`

- **Type:** `StyleProp<ViewStyle>`
- **Required:** ❌ No
- **Description:** Custom style for the places suggestions list.
- **Example:**
  ```tsx
  <PlacesAutocomplete
    listStyle={{
      maxHeight: 300,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      elevation: 3,
    }}
  />
  ```

### `highlightedStyle`

- **Type:** `StyleProp<TextStyle>`
- **Required:** ❌ No
- **Description:** Custom style for text portions that match the user's search. These portions are highlighted in the suggestions list.
- **Example:**
  ```tsx
  <PlacesAutocomplete
    highlightedStyle={{
      fontWeight: 'bold',
      color: '#10B981',
    }}
  />
  ```

---

## Optional Icon Props

### `leftIcon`

- **Type:** `ReactNode`
- **Required:** ❌ No
- **Description:** Custom icon to display on the left side of the input. By default, a magnifying glass (🔍) is displayed.
- **Example:**

  ```tsx
  import { MaterialCommunityIcons } from '@expo/vector-icons';

  <PlacesAutocomplete
    leftIcon={<MaterialCommunityIcons name="magnify" size={24} />}
  />;
  ```

### `rightIcon`

- **Type:** `ReactNode`
- **Required:** ❌ No
- **Description:** Custom icon to display on the right side of the input when the input is not loading. By default, a cross (✕) that clears the text is displayed.
- **Example:**
  ```tsx
  <PlacesAutocomplete rightIcon={<Text>🔄</Text>} />
  ```

### `pinIcon`

- **Type:** `ReactNode`
- **Required:** ❌ No
- **Description:** Custom icon to display in each place suggestion. By default, a pin (📍) is displayed.
- **Example:**

  ```tsx
  import { MaterialCommunityIcons } from '@expo/vector-icons';

  <PlacesAutocomplete
    pinIcon={
      <MaterialCommunityIcons name="map-marker" size={20} color="white" />
    }
  />;
  ```

### `pinIconBackgroundColor`

- **Type:** `string`
- **Required:** ❌ No
- **Description:** Background color for the pin icon container in each suggestion. Accepts standard CSS colors or hex values.
- **Default value:** `#F0FDF4` (light green)
- **Example:**
  ```tsx
  <PlacesAutocomplete pinIconBackgroundColor="#EFF6FF" />
  ```

---

## Optional Color and Appearance Props

### `placeholder`

- **Type:** `string`
- **Required:** ❌ No
- **Description:** Placeholder text displayed in the input when it's empty.
- **Example:**
  ```tsx
  <PlacesAutocomplete placeholder="Enter an address..." />
  ```

### `placeholderTextColor`

- **Type:** `string`
- **Required:** ❌ No
- **Description:** Color of the placeholder text. Inherited from `TextInputProps` in React Native.
- **Default value:** `#9CA3AF` (gray)
- **Example:**
  ```tsx
  <PlacesAutocomplete placeholderTextColor="#B0B0B0" />
  ```

### `loadingColor`

- **Type:** `string`
- **Required:** ❌ No
- **Description:** Color of the loading indicator displayed while suggestions are being fetched.
- **Default value:** `#10B981` (green)
- **Example:**
  ```tsx
  <PlacesAutocomplete loadingColor="#3B82F6" />
  ```

---

## Props Inherited from `TextInputProps`

The component extends `TextInputProps` from React Native, which means you can also use standard `TextInput` props:

- `editable` - Enable/disable editing
- `autoCapitalize` - Auto capitalization
- `autoCorrect` - Auto correction
- `returnKeyType` - Return key type (default: 'search')
- `keyboardType` - Keyboard type
- `maxLength` - Maximum text length
- `secureTextEntry` - Hide text
- And all other available `TextInput` props

---

## Complete Usage Example

```tsx
import { PlacesAutocomplete } from 'react-native-place-autocomplete';
import { View, Text } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <PlacesAutocomplete
        apiKey="YOUR_GOOGLE_PLACES_API_KEY"
        minLength={2}
        debounce={400}
        placeholder="Search for an address..."
        onSelect={(place) => {
          setSelectedPlace(place);
          console.log('Selected address:', place.description);
          console.log('Coordinates:', place.coordinates);
        }}
        containerStyle={{ marginTop: 10 }}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          backgroundColor: '#fff',
        }}
        inputStyle={{ fontSize: 14 }}
        listStyle={{ maxHeight: 300 }}
        highlightedStyle={{ fontWeight: 'bold', color: '#10B981' }}
        loadingColor="#10B981"
        pinIconBackgroundColor="#E0F2FE"
        placeholderTextColor="#9CA3AF"
      />

      {selectedPlace && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {selectedPlace.description}
          </Text>
          <Text>Latitude: {selectedPlace.coordinates.lat}</Text>
          <Text>Longitude: {selectedPlace.coordinates.lng}</Text>
        </View>
      )}
    </View>
  );
}
```

---

## Important Notes

- The Google Places API must be enabled on your Google Cloud Platform account
- A request quota applies according to your Google pricing plan
- The component supports English and other languages via the language parameter in requests
- Filtered places exclude certain types (routes, intersections, etc.) to improve user experience
- The component automatically cancels ongoing requests on unmount or new search

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [MJdiop](https://github.com/MJdiop)
