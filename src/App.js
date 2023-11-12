import Footer from './Footer/Footer'
import YoutubePlayer from './YoutubePlayer';

const App = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 999
        }}>
            <YoutubePlayer />
            <Footer page1="drawer-page1" page2="drawer-page2" page3="drawer-page3" page4="drawer-page4" />
        </div>
    )
}

export default App;