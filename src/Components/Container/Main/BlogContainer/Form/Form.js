import React from 'react';

const Form = () => {
        return (
    <form autocomplete="off" class ="form">
        <label for="title" class="form__label">Tytuł</label>
        <input id="title" class="form__title"></input>
        <label for="content" class="form__label">Treść</label>
        <textarea id="content" class="form__content"></textarea>
        <button class="form__add">Dodaj artykuł</button>
    </form>
    )
}  

export default Form;