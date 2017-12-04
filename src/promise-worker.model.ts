export interface ISendMessage {
  messageId: number;
  payload: any;
}

export interface IResultMessage {
  messageId: number;
  result?: any;
  error: any;
}
