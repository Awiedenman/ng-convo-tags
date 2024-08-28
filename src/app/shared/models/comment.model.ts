export interface Comment {
  id: number;
  userId: number;
  recipient: number;
  timestamp: Date;
  text: string;
}
