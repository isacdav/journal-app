import '@testing-library/jest-dom';
import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from '../../actions/ui';
import { types } from '../../types/types';

describe('Test UI actions', () => {
  test('every action should work', () => {
    const errorAction = setError('Help!');
    const removerErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoafingAction = finishLoading();

    expect(errorAction).toEqual({ type: types.uiSetError, payload: 'Help!' });
    expect(removerErrorAction).toEqual({ type: types.uiRemoveError });
    expect(startLoadingAction).toEqual({ type: types.uiStartLoading });
    expect(finishLoafingAction).toEqual({ type: types.uiFinishLoading });
  });
});
