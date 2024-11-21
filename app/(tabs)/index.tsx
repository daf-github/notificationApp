import { Button, StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { useEffect } from 'react';

import * as Notifications from 'expo-notifications';

export default function TabOneScreen() {
  useEffect(() => {
    Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    }).then((status) => console.log('PERM:', JSON.stringify(status, null, 4)));
  }, []);

  const scheduleNotifications = async () => {
    console.log('scheduleNotifications function');

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Open the notification to read them all',
        sound: 'email_sound.wav', // <- for Android below 8.0
      },
      trigger: {
        seconds: 2,
        channelId: 'new_emails', // <- for Android 8.0+, see definition above
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Schedule" onPress={scheduleNotifications} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
