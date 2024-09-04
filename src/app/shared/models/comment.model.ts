export interface Comment {
  id: number;
  userId: number;
  recipient: number;
  timestamp: Date;
  displayTime: string;
  text: string;
};
