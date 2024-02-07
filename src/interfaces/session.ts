// Chat Session
export interface Session {
    session_id: string;
    user_id: Number;
    started: string;
    ended: string;
    question: string;
    answer: string;
    raw: string;
  }