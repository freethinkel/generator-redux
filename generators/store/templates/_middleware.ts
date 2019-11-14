import { Store } from 'redux';
import { SET_TOKEN } from '../constants/login';

export default (state: Store) => (next: any) => (action: any): any => {
	const { dispatch } = state;
	switch (action.type) {
		default:
			next(action);
			break;
	}
};
