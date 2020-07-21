import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

const CLIENT_ID = '873646336884-iq6mglnv6ha0uhcobgj2c4oi8iucddoh.apps.googleusercontent.com'
const SCOPES = 'email'

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance()
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange.bind(this))
      })
    })
  }

  onAuthChange(isSignedIn) {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      this.props.signOut()
    }
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
      return(
        <div>
          <button className="ui red google button" onClick={this.auth.signOut}>
            <i className="google icon" />
            SignOut
          </button>
        </div>
      )
    } else {
      return(
        <div>
          <button className="ui red google button" onClick={this.auth.signIn}>
            <i className="google icon" />
            SignIn
          </button>
        </div>
      )
    }
  }
  render() {
    return(
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

const mapDispatchToProps = {
  signIn,
  signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth)
