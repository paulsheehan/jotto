import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from './test/testUtils';
import { UnconnectedInput } from './Input';

/**
 * @function setup
 * @param {object} initialState 
 * @returns {ShallowWrapper}
 */
const setup = (initialState={}) => {
    const wrapper = shallow(<UnconnectedInput {...initialState}/>);
    return wrapper;
}
setup();
describe('render', () => {
    describe('word has not been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: false };
            wrapper = setup(initialState);
        });
        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });
        test('renders input box', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(1);
        });
        test('renders submit button', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button');
            expect(submitButton.length).toBe(1);
        });
    });
    describe('word has been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: true };
            wrapper = setup(initialState);
        });
        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });
        test('does not render input box', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(0);
        });
        test('does not render submit button', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button');
            expect(submitButton.length).toBe(0);
        });
    });
});


describe('`guessWord` action creator call', () => {
    let guessWordMock;
    let wrapper;
    const guessedWord = "train";

    beforeEach(() => {
        guessWordMock = jest.fn();
        const props =  {
            guessWord: guessWordMock
        };
        wrapper = shallow(<UnconnectedInput {...props}/>);

        // add value to the input box
        wrapper.instance().inputBox.current = { value: guessedWord };

        const submitButton = findByTestAttr(wrapper, "submit-button");
        submitButton.simulate('click', { preventDefault() {} });
    })

    test('`guessWord` runs on submit-button click', () => {
        const guessWordCallCount = guessWordMock.mock.calls.length;
    
        expect(guessWordCallCount).toBe(1);
    });

    test('calls `guessWord` with input value as argument', () => {
        const guessWordArg = guessWordMock.mock.calls[0][0];
        expect(guessWordArg).toBe(guessedWord);
    });

    test('test input box clears on submit', () => {
        expect(wrapper.instance().inputBox.current.value).toBe('');
    });
})

