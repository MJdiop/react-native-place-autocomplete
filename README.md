


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

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [MJdiop](https://github.com/MJdiop)
