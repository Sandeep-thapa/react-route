import React from 'react';


const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: CLIENT_ID,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    onAuthChange = () => {

        this.setState({ isSignedIn: true })
    }
    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <div>No information on authentication</div>;
        } else if (this.state.isSignedIn) {
            return <div>Signed In</div>
        } else {
            return <div>Not signed in</div>
        }

    }
    render() {
        return <div> {this.renderAuthButton()} </div>;
    }
}

export default GoogleAuth;