import React from 'react';
import Container from '../../Components/Container/Container'
import '../../normalize.css';
import '../../index.css';
import {BrowserRouter, Route} from 'react-router-dom'
import BlogView from '../BlogView/BlogView'
import GalleryView from '../GalleryView/GalleryView'

class Root extends React.Component {
    render() {
        return (
            <BrowserRouter>
            <>
            <Container/>
            <Route exact path="/" Component={BlogView}/>
            <Route path="/gallery" Component={GalleryView}/>
            </>
            </BrowserRouter>    
        )
    }
}

export default Root;