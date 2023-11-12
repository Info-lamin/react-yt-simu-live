import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyB6gP_8UK0ANh1ehnG5APwrG9zMvlXpMTM",
    authDomain: "silent-polygon-295917.firebaseapp.com",
    databaseURL: "https://silent-polygon-295917-default-rtdb.firebaseio.com",
    projectId: "silent-polygon-295917",
    storageBucket: "silent-polygon-295917.appspot.com",
    messagingSenderId: "988211688233",
    appId: "1:988211688233:web:88c8ef9e238ee8166cfd38",
    measurementId: "G-7N28726011"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

// Styles
const paperStyle = {
    padding: '20px',
    margin: '20px',
};

const chatContainerStyle = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'start'
};

const formStyle = {
    marginTop: '20px',
    display: 'flex',
};

const inputStyle = {
    flexGrow: 1,
    marginRight: '10px',
};

function ChatApp({ roomName }) {
    const [user] = useAuthState(auth);

    return (
        <div>
            <header>
                <SignOut />
            </header>

            <section>
                {user ? <ChatRoom roomName={roomName} /> : <SignIn />}
            </section>
        </div>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };

    return (
        <Grid container direction="column" alignItems="center">
            <Button variant="contained" color="primary" onClick={signInWithGoogle}>
                Sign in with Google
            </Button><br />
            <p>Do not violate the community guidelines or you will be banned!</p>
        </Grid>
    );
}

function SignOut() {
    return auth.currentUser && (
        <Button variant="outlined" color="secondary" onClick={() => auth.signOut()}>
            Sign Out
        </Button>
    );
}
function ChatRoom({ roomName }) {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.where('roomName', '==', roomName);

    const [unsortedMessages] = useCollectionData(query, { idField: 'id' });
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (unsortedMessages) {
            // Sort messages by createdAt or id (whichever is applicable)
            const sortedMessages = unsortedMessages.slice().sort((a, b) => a.createdAt - b.createdAt);
            setMessages(sortedMessages);
        }
    }, [unsortedMessages]);
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, displayName } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            displayName,
            roomName,
        });

        setFormValue('');
    };

    return (
        <Grid container direction="column" gap={2} style={paperStyle}>
            <form onSubmit={sendMessage} style={formStyle}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="Enter your message"
                    style={inputStyle}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!formValue}
                >
                    Send
                </Button>
            </form>

            <Paper elevation={3} style={chatContainerStyle}>
                {messages &&
                    messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
            </Paper>

        </Grid>
    );
}

function ChatMessage(props) {
    const { text, uid, displayName } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <p><b>{displayName}</b>: {text}</p><br />
        </div>
    );
}

export default ChatApp;
