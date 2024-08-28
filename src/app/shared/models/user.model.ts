export interface User {
  name: string;
  id: number | null;
  photo: string;
  taggedConversationIds: number[];
}
