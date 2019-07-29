// GraphQL
import gql from 'graphql-tag';

export const chatQuery = gql`
	query chatQuery {
		getChats {
			id
			groupId
			message
			ownerId
			date
		}
	}
`;

export const createChatMutation = gql`
	mutation createChatMutation(
		$message: String
		$groupId: Int
		$ownerId: Int
		$date: String
	) {
		createChat(
			message: $message
			groupId: $groupId
			ownerId: $ownerId
			date: $date
		) {
			id
			groupId
			message
			ownerId
			date
		}
	}
`;