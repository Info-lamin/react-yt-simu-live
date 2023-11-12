import DrawerPage from "./DrawerPage";
import './Drawer.css';
import ChatApp from "../../ChatApp";
import { useEffect } from 'react';

const Drawer = (props) => {

    function hideDrawer() {
        document.getElementsByClassName("drawer")[0].style.bottom = "-100%";
        window.history.replaceState({}, "", window.location.origin + window.location.pathname + window.location.search);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27 || event.key === 'Escape') {
                hideDrawer();
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('keydown', handleKeyDown);
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="drawer">
            <div className="close-container" onClick={hideDrawer}>
                <button>&#x2716;</button>
            </div>
            <div className="drawer-content">
                <DrawerPage id={props.id1}>
                    <ChatApp roomName={window.room_name + '_chat'} />
                </DrawerPage>
                <DrawerPage id={props.id2}>
                    <div dangerouslySetInnerHTML={{ __html: new DOMParser().parseFromString(window.download_page, 'text/html').body.innerHTML }}></div>
                </DrawerPage>
                <DrawerPage id={props.id3}>
                    <div dangerouslySetInnerHTML={{ __html: new DOMParser().parseFromString(window.join_page, 'text/html').body.innerHTML }}></div>
                </DrawerPage>
                <DrawerPage id={props.id4}>
                    <ChatApp roomName={window.room_name + '_QnA'} />
                </DrawerPage>
            </div>
        </div>
    )
}

export default Drawer;