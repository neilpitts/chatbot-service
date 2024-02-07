// messageConverter.ts

import { ColumnTypeUndefinedError } from "typeorm";

export enum KnownMessageRole {
    System = "system",
    User = "user",
    Assistant = "assistant",
  }


  
  export interface Message {
    message: string;
    role: KnownMessageRole;
    // rating: number | undefined;
  }
  
  export interface Conversation {
    messages?: Message[];
  }
  
  export interface Body {
    conversation: Conversation;
  }
  
  export function convertMessages(messagesArray: string[]): Message[] | undefined {
    const result: Body = {
      conversation: {
        messages: [],
      },
    };
  
    messagesArray.forEach((line, index) => {
      const role = line.startsWith("Jarvis:") ? KnownMessageRole.Assistant : KnownMessageRole.User;
      const message = line.replace(/^(Jarvis: |User: )/, "").replace(/ <END_OF_TURN>$/, "");
      result.conversation.messages?.push({
        message,
        role,
      });
    });
  
    return result.conversation.messages;
  }
  