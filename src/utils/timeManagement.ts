// timestamp-utils.ts

export function getTimestamp(specificDateString?: string): string {
    // Create a Date object for the specific date or for the current date and time
    const date = specificDateString ? new Date(specificDateString) : new Date();
  
    // Format the Date object as a SQL timestamp
    const timestamp = date.toISOString().slice(0, 19).replace('T', ' ');
    return timestamp;
  }