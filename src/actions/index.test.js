import moxios from 'moxios';

import { storeFactory } from '../test/testUtils';
import { getSecretWord } from './';

describe('getSecretWord action creator', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test('adds responce word to state', () => {
        const secretWord = 'party';
        const store = storeFactory();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                responce: secretWord,
            });
        });

        return store.dispatch(getSecretWord())
        .then(() => {
            const newState = store.getState();
            expect(newState.secretWord).toBe(secretWord);
        });
    });
});