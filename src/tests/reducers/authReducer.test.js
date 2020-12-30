import '@testing-library/jest-dom';
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Test in authReducer', () => {
  test('should login successful', () => {
    const initState = {};

    const action = {
      type: types.login,
      payload: {
        uid: 'abc',
        displayName: 'Isaac',
      },
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({
      uid: 'abc',
      name: 'Isaac',
    });
  });

  test('should logout successful', () => {
    const initState = {
      uid: 'abc',
      name: 'Isaac',
    };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({});
  });

  test('should not change the estate', () => {
    const initState = {
      uid: 'abc',
      name: 'Isaac',
    };

    const action = {
      type: '[not] valid type',
    };

    const state = authReducer(initState, action);

    expect(state).toEqual(initState);
  });
});
