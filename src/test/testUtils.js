import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import { middlewares } from '../configureStore';
/**
 * Create a testing store with imported reducers, middlewate, and an initial state.
 * globals: rootReducer, middlewares
 * @param { object } initialState - Initial state for store
 * @function storeFactory
 * @returns {Store} - Redux store. 
 */
export const storeFactory = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares) (createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
}

/**
 * Return node(s) with the given data-test attribute
 * @param {ShallowWrapper} wrapper 
 * @param {string} val 
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}

export const checkProps = (component, conformingProps) => {
    const propError = checkPropTypes(
        component.propTypes,
        conformingProps,
        'prop', 
        component.name
    );
    expect(propError).toBeUndefined();
}

