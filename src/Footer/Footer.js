import React from 'react';
import FooterButton from "./FooterButton";
import Drawer from './Drawer/Drawer';

const Footer = (props) => {
    function showDrawer(pageId) {
        var page = document.getElementById(pageId);
        Array.from(document.getElementsByClassName('drawer-page')).forEach(element => {
            element.style.display = 'none';
        });
        page.style.display = 'block';
        document.getElementsByClassName("drawer")[0].style.bottom = "0%";
        const newHashFragment = "drawer";
        const currentState = { fragment: newHashFragment };
        window.history.pushState(currentState, "", "#" + newHashFragment);
    }

    window.onpopstate = () => {
        document.getElementsByClassName('close-container')[0].click()
    }

    return (
        <>
            <div className="menu-buttons">
                <FooterButton id={props.page1} showDrawer={showDrawer} name='CHAT' />
                <FooterButton id={props.page2} showDrawer={showDrawer} name='Download' />
                <FooterButton id={props.page3} showDrawer={showDrawer} name='Links' />
                <FooterButton id={props.page4} showDrawer={showDrawer} name='QnA' />
            </div>
            <Drawer id1={props.page1} id2={props.page2} id3={props.page3} id4={props.page4} />
        </>
    );
}

export default Footer;
