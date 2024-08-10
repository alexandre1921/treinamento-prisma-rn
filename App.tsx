import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { extendedClient, initializeDb } from './utils/prisma';

function AppInitialized() {
  const users = extendedClient.user.useFindMany();

  console.log(users)

  useEffect(() => {
    extendedClient.user.create({
      data: {
        name: 'teste'
      }
    })
    .then((res) => console.log('res: ', res))
    .catch(console.log)
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    initializeDb().then(() => setDbInitialized(true)).catch(console.log)
  }, [])

  if (!dbInitialized) return <ActivityIndicator />

  return <AppInitialized />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
