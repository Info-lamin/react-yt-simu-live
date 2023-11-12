import Footer from './Footer/Footer'
import YoutubePlayer from './YoutubePlayer';

const App = () => {
    return(
        <>
            <YoutubePlayer />
            <Footer page1="drawer-page1" page2="drawer-page2" page3="drawer-page3" page4="drawer-page4" />
        </>
    )
}

export default App;