import React from 'react';
import { DbHelperSingleton } from '../../Helpers/dbHelper';
import CryptoJS from 'crypto-js'

class GalleryView extends React.Component {
    constructor(){
        super()

        // this.database2 = DbHelperSingleton.getInstance().pushImageURL()
        this.database = DbHelperSingleton.getInstance().getURLs();
        this.storage = DbHelperSingleton.getInstance().storage();

    this.state = {
        image: null,
        images: [{URL: 'https://slodycze-24.pl/wp-content/uploads/2019/08/placeholder.jpg'}],
        clickImageURL: '',
        display: 'none'
        }
    }

    handleChange = (e) => {
        if (e.target.files[0]){
            const image = e.target.files[0];
            const imageNameHashed = CryptoJS.MD5(image.name + Date.now()).toString();
            this.storage.ref(`images/${imageNameHashed}`).put(image).on("state_changed",
                snap => {console.log(snap)}, 
                error => {console.log(error)},
                () => {this.storage.ref("images").child(imageNameHashed).getDownloadURL().then(url => {
                    const imgURL = url;
                    DbHelperSingleton.getInstance().pushImageUrl({
                        name: imageNameHashed,
                        URL: imgURL
              })
                });
                    }
      )
        }
      };

    removeImg = (e, ImgID, ImgName) => {
        e.stopPropagation();
        this.storage.ref("images").child(ImgName).delete();
        this.database.child(ImgID).remove();

    }

    componentDidMount() {
        this.database.on('value', snap => {
            const images = snap.val()
                this.setState({
                    images: images ? Object.values(images) : []
                });
        });
    }

    showPreview = (itemURL) => {
        this.setState({
            clickImageURL: itemURL ? itemURL : '',
            display: 'flex'
        }) 
    }

    closePreview = () => {
        this.setState({
            display: 'none'
        })
    }

    componentWillUnmount() {
        this.database.off('value');
    }

    render(){
            return (
   
    <div className="gallery">
    <div className="gallery__body">
        <form className="gallery__form">
                <label className="gallery__button" htmlFor = "upload-btn">Dodaj zdjęcie</label>
                <input accept="image/x-png,image/gif,image/jpeg" id="upload-btn" style={{display: "none"}}type="file" onChange={this.handleChange}/>
        </form>
        <div className="gallery__container">
            {this.state.images.map(item => 
                <div onClick={() => this.showPreview(item.URL)}className='gallery__thumbnail'
                style={{
                    height: '100%',
                    backgroundImage: `url(${item.URL})`,
                    backgroundSize:'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    borderRadius: '12px',
                }}> 
                    <div onClick={e => this.removeImg(e, item.ID, item.name)} className="gallery__remove">
                    <i className="fas fa-trash"></i>
                    </div>
                    </div>)}
        </div>
    </div>
            <div className="gallery__preview-container" style={{
                display: `${this.state.display}`
            }}
            onClick={() => this.closePreview()} 
            >
                <div className="gallery__preview">
                    <img className="gallery__image" src={this.state.clickImageURL}
                        onClick={(e)=>e.stopPropagation()}></img>
                </div>
            </div>
    </div>
    

    
    
            )
        }
    }
    

export default GalleryView;