import { Button, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { EventSubscription } from 'expo-notifications';

export default function TabOneScreen() {
  const notificationListener = useRef<EventSubscription>();
  const responseListener = useRef<EventSubscription>();

  useEffect(() => {
    Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        // allowAnnouncements: true,
      },
    }).then((status) => {
      console.log('PERM: ', status);
    });

    // Received notification while app is in foreground
    // notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {
    //   const count = await Notifications.getBadgeCountAsync();
    //   await Notifications.setBadgeCountAsync(count + 1);
    // });

    // // // Tap on notification to open app
    // responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
    //   console.log('RESPONSE: ', response);
    //   Notifications.dismissAllNotificationsAsync();
    //   Notifications.setBadgeCountAsync(0);
    //   // alert(response.notification.request.content.data.data);
    // });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  const scheduleNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'secret message' },
      },
      // trigger: { seconds: 2 },

      trigger: {
        seconds: 2,
        channelId: 'new_emails', // <- for Android 8.0+, see definition above
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Schedule Notifications" onPress={scheduleNotifications} />
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
