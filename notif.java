if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    CharSequence name = "Task Notifications";
    String description = "Notifications for task deadlines";
    int importance = NotificationManager.IMPORTANCE_DEFAULT;
    NotificationChannel channel = new NotificationChannel("TASK_DEADLINE_CHANNEL", name, importance);
    channel.setDescription(description);
    channel.enableVibration(true);
    
    // Set custom sound
    Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
    channel.setSound(soundUri, null);
    
    NotificationManager notificationManager = getSystemService(NotificationManager.class);
    notificationManager.createNotificationChannel(channel);
}

// Set the time for the notification (for example, task due date)
long triggerAtMillis = taskDeadlineTimeInMillis;  // Task deadline in milliseconds

Intent intent = new Intent(context, DeadlineReceiver.class);
PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
if (alarmManager != null) {
    alarmManager.setExact(AlarmManager.RTC_WAKEUP, triggerAtMillis, pendingIntent);
}

public class DeadlineReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        // Create a notification when the deadline arrives
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, "TASK_DEADLINE_CHANNEL")
                .setSmallIcon(R.drawable.ic_notification)
                .setContentTitle("Task Deadline Reached!")
                .setContentText("Your task is due!")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION));

        // Show notification
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
        notificationManager.notify(0, builder.build());
    }
}

public class DeadlineReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        // Create a notification when the deadline arrives
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, "TASK_DEADLINE_CHANNEL")
                .setSmallIcon(R.drawable.ic_notification)
                .setContentTitle("Task Deadline Reached!")
                .setContentText("Your task is due!")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION));

        // Show notification
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
        notificationManager.notify(0, builder.build());
    }
}