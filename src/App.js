import './App.css';
import {GoogleLogin} from 'react-google-login'
import axios from "axios";
import {useState} from "react";

function App() {

    function responseGoogle(response) {
        console.log(response)
        const {code} = response
        axios.post('/api/create-tokens', {code})
            .then(() => setSignedIn(true))
            .catch(err => console.log(err))
    }

    function responseError(err) {
        console.log(err)
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/api/create-event', {
            summary,
            description,
            location,
            startDateTime,
            endDateTime
        }).then(() => setSignedIn(true))
            .catch(err => console.log(err))
    }

    const [summary, setSummary] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [startDateTime, setStartDateTime] = useState('')
    const [endDateTime, setEndDateTime] = useState('')
    const [signedIn, setSignedIn] = useState(false)

    return (
        <div className="App">
            <h1>Google Calendar API</h1>
            {
                !signedIn ? (
                    <div>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText='Sign in & Authorize Calendar'
                            onSuccess={responseGoogle}
                            onFailure={responseError}
                            cookiePolicy={'single_host_origin'}
                            responseType='code'
                            accessType='offline'
                            scope='openid email profile https://www.googleapis.com/auth/calendar'
                        />
                    </div>
                ) : (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="summary">Summary</label>
                            <br/>
                            <input type="text" id="summary" name="summary" value={summary}
                                   onChange={e => setSummary(e.target.value)}/>
                            />
                            <label htmlFor="description">Description</label>
                            <br/>
                            <input type="text" id="description" name="description" value={description}
                                   onChange={e => setDescription(e.target.value)}/>
                            />
                            <label htmlFor="location">Location</label>
                            <br/>
                            <input type="text" id="location" name="location" value={location}
                                   onChange={e => setLocation(e.target.value)}/>
                            />
                            <label htmlFor="startDateTime">Start Date Time</label>
                            <br/>
                            <input type="text" id="startDateTime" name="startDateTime" value={startDateTime}
                                   onChange={e => setStartDateTime(e.target.value)}/>
                            />
                            <label htmlFor="endDateTime">End Date Time</label>
                            <br/>
                            <input type="text" id="endDateTime" name="endDateTime" value={endDateTime}
                                   onChange={e => setEndDateTime(e.target.value)}/>
                            />
                        </form>
                    </div>
                )
            }
        </div>
    );
}

export default App;
