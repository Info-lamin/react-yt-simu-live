const DrawerPage = (props) => {
    return (
        <div className="drawer-page" id={props.id}>
            {props.children}
        </div>
    )
}

export default DrawerPage;