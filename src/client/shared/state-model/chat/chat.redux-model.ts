// Service
import { ChatServiceEngine } from '@omega-core/services/chat.service';
import { UserServiceEngine } from '@omega-core/services/user.service';

// Redux
import { ChatEffectsEngine } from './redux/chat.effects';
import { ChatActionsEngine, ChatActionTypes } from './redux/chat.actions';
import { getChatState } from './redux/chat.selectors';
import { ChatRulesEngine } from './redux/chat.rules';

interface IDispatch {
  (arg0: { type: string; payload: any; }): void;
  (arg0: { type: string; payload: any; }): void;
  (arg0: { type: string; payload: any; }): void;
  (arg0: { type: string; payload: any; }): void;
}

export const ChatReduxModel = ({
  attributes: {
    currentUsers: {
      id: '',
      name: '',
      status: '',
      avatar: '',
    },
    currentChat: {
      text: '',
      type: '',
      date: '',
    },
    defaultChats: [],
    defaultUsers: [],
  },
  actionTypes: {
    ...ChatActionTypes,
  },
  actions: {
    ...ChatActionsEngine,
  },
  effects: {
    ...ChatEffectsEngine,
  },
  rules: {
    ...ChatRulesEngine,
  },
  services: {
    ...ChatServiceEngine,
    ...UserServiceEngine,
  },
  reduxActions: (dispatch: IDispatch) => ({
    dispatchReadAllUsersAndChats: (payload: any) => dispatch(ChatReduxModel.actions.effects.readAllUsersAndChats(payload)),
    dispatchCreateChat: (payload: any) => dispatch(ChatReduxModel.actions.effects.createChat(payload)),
    dispatchDeleteChat: (payload: any) => dispatch(ChatReduxModel.actions.effects.deleteChat(payload)),
    dispatchEditChat: (payload: any) => dispatch(ChatReduxModel.actions.effects.editChat(payload)),
  }),
  reduxState: (state: any) => ({
    chats: getChatState(state),
  }),
});