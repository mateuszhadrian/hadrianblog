import React from 'react';

const EmptyField = (props) => {
    return (
        <p className="form__error">{props.errorMessage}</p>
    )
}

export default EmptyField;