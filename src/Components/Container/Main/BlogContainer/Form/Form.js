import React from 'react';

const Form = (props) => {
        return (
    <form onSubmit={props.submitFn} autocomplete="off" class="form">
        <label for="title" class="form__label">Tytuł</label>
        <input id="title" class="form__title" />
        <label for="content" class="form__label">Treść</label>
        <textarea id="content" class="form__content"></textarea>
        <button type="submit" class="form__add">Dodaj artykuł</button>
    </form>
    )
}  

export default Form;