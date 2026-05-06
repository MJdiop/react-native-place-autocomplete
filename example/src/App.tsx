/* eslint-disable react-native/no-inline-styles */
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

          {result && (
            <View style={styles.result}>
              <Text>Result: {JSON.stringify(result)}</Text>
            </View>
          )}
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
  result: {
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
});
