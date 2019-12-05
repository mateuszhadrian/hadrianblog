import React from 'react';
import { DbHelperSingleton } from '../../Helpers/dbHelper' 

class GalleryView extends React.Component {
    constructor(){
        super()

        // this.database2 = DbHelperSingleton.getInstance().pushImageURL()
        this.database = DbHelperSingleton.getInstance().getURLs();
        this.storage = DbHelperSingleton.getInstance().storage();

    this.state = {
        image: null,
        images: [{URL: 'https://slodycze-24.pl/wp-content/uploads/2019/08/placeholder.jpg'}]
        }
    }

    handleChange = (e) => {
        if (e.target.files[0]){
            const image = e.target.files[0];
            this.storage.ref(`images/${image.name}`).put(image).on("state_changed",
                snap => {console.log(snap)}, 
                error => {console.log(error)},
                () => {this.storage.ref("images").child(image.name).getDownloadURL().then(url => {
                    const imgURL = url;
                    DbHelperSingleton.getInstance().pushImageUrl({
                        URL: imgURL
              })
                });
                    }
      )
        }
      };

    componentDidMount() {
        this.database.on('value', snap => {
            const images = snap.val()
                this.setState({
                    images: images ? Object.values(images) : []
                });
                console.log(this.state.images);
        });
    }

    componentWillUnmount() {
        this.database.off('value');
    }

    render(){
            return (
    <div className="gallery__body">
        <form className="gallery__form">
                <label className="gallery__button" for = "upload-btn">Dodaj zdjęcie</label>
                <input id="upload-btn" style={{display: "none"}}type="file" onChange={this.handleChange}/>
        </form>
        <div className="gallery__container">
            {this.state.images.map(item => 
            <div
            style={{
                backgroundImage: `url(${item.URL})`,
                backgroundSize:'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                borderRadius: '12px',
                boxShadow: '10px 10px 14px 1px rgba(0, 0, 0, 0.075)'
            }}></div>)}
        </div>
    </div>
    
            )
        }
    }
    

export default GalleryView;