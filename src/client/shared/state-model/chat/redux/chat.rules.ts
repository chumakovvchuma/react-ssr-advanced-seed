class ChatRules {
  static validateChat(action: any) {
    console.log('i was called to validate chat', action);
    // throw new Error('I could not update');
    return 'done';
  }

  static validateChatAgain(action: any) {
    console.log('i was called to validate chat again', action);
    // throw new Error('I could not update again');
    return 'done';
  }
}

export const ChatRulesEngine =
{
  validateChat: (action: any) => ChatRules.validateChat(action),
  validateChatAgain: (action: any) => ChatRules.validateChatAgain(action),
};
