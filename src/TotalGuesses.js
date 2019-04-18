import React from 'react';
import PropTypes from 'prop-types';

/** 
 * Functional react component for guess count
 * @function 
 * @param {object} props - React props.
 * @returns {JSX.Element}  - Renedered component
 */

const TotalGuesses =  (props) => {
    return (
        <h4 data-test="component-total-guesses">
          Total Guesses: {props.guessCount}
        </h4>
    );
}; 

TotalGuesses.propTypes = {
    guessCount: PropTypes.number.isRequired,
};

export default TotalGuesses;