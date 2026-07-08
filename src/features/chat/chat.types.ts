export interface ChatMessage {
    id:string,
    text:string,
    sender:'user'| 'system'| 'bot',
    timestamp:string,
}