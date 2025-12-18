export interface SetReminderDto {
  chatId: number;
  userId: number;
  reminderAt: Date;
}

export interface SetReminderSeenDto {
  chatId: number;
  userId: number;
}