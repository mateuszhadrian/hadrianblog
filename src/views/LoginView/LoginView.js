import React from 'react';
import { DbHelperSingleton } from '../../Helpers/dbHelper';



class LoginView extends React.Component {
    state = {
        email: '',
        password: ''
    }

login = (e) => {
    e.preventDefault();
    DbHelperSingleton.getInstance().app.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((u) => {} )
    .catch((error) => console.log(error));
    this.resetState();
}

signup = (e) => {
    e.preventDefault();
    DbHelperSingleton.getInstance().app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((u) => { console.log(u)} )
    .catch((error) => console.log(error));
    this.resetState();
}

handleChange = (e) => {
    this.setState({ 
        [e.target.name]: e.target.value
    });
}

resetState = () => {
    this.setState({
        email:'',
        password:''
    })
}

logout = () => {
    DbHelperSingleton.getInstance().app.auth().signOut();
}

render() {
    return (
        <div className="login__container">
        {this.props.user ? (
            <div className='login__loggedin'>
            <h1 className="login__info">Jesteś zalogowany jako administrator</h1>
            <button className='login__button' onClick={this.logout}>Wyloguj</button>
            </div>
        ) : (
            <form className="login__form">
                <label className='login__label' htmlFor='email'>E-mail :</label>
                <input className='login__input' type='email' id='E-mail' name='email' value={this.state.email} onChange={this.handleChange} />

                <label className='login__label' htmlFor='password'>Hasło :</label>
                <input className='login__input' type='password' id='password' name='password' value={this.state.password} onChange={this.handleChange} />

                <button className='login__button' onClick={this.login} type='submit'>Zaloguj się</button>
                {/* <button onClick={this.signup}>SignUp</button> */}
            </form>
        )}    
        </div>

    )
}
}

export default LoginView;