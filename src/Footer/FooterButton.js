import './FooterButton.css';
import Button from '@mui/material/Button';

const FooterButton = (props) => {
    return (
        <Button
            variant="contained"
            color="primary"
            style={{
                margin: '5px',
                fontSize: '12px',
                lineHeight: '1.25',
                padding: '6px 8px',
                width: '100%',
                textTransform: 'none'
            }}
            onClick={() => { props.showDrawer(props.id) }}
            disabled={props.disabled}
        >
            {props.name}
        </Button>
    )
}

export default FooterButton;