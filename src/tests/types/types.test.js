import '@testing-library/jest-dom';
import { types } from '../../types/types';

// if a type is added to the original types it must be added here
const typesCopy = {
  login: '[Auth] Login',
  logout: '[Auth] Logout',

  uiSetError: '[UI] Set Error',
  uiRemoveError: '[UI] Remove Error',
  uiStartLoading: '[UI] Start Loading',
  uiFinishLoading: '[UI] Finish Loading',

  notesAddNew: '[Notes] Add New',
  notesActive: '[Notes] Set Active Note',
  notesLoad: '[Notes] Load Notes',
  notesUpdated: '[Notes] Updated Note',
  notesFileUrl: '[Notes] Updated Imgage URL',
  notesDelete: '[Notes] Delete Note',
  notesLogoutCleaning: '[Notes] Logout Cleaning',
};

describe('Test the types', () => {
  test('should match the initial types', () => {
    expect(types).toEqual(typesCopy);
  });
});
