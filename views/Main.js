import React,{ Component } from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import Tasks from '../components/Tasks'

import Firebase from '../conf/firebase.conf'

class Main extends Component{

    firebase = Firebase()

    state = {
        isLogged: false,
        user: null
    }

    componentDidMount(){
        this.firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({
                    isLogged: true,
                    user: user.uid
                })
            }
        })
    }

    render(){
        return <main style={styles.main}>
            {this.state.isLogged ? 
                <Tasks user={this.state.user}/>
            :
                <div className="w-50">
                    <h2 style={styles.h2}>Do you have not logged yet?</h2>
                    <p style={styles.p}>well, SigIn or SignUp right now</p>
                    <div className="w-50 mx-auto d-flex justify-content-around">
                        <Link href='/signin'>
                            <Button variant="contained" color="primary">
                                SignIn
                            </Button>
                        </Link>

                        <Link href='/signup'>
                            <Button variant="contained" color="secondary">
                                SignUp
                            </Button>
                        </Link>
                    </div>
                </div>
            }
        </main>
    }
}

const styles = {
    main: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },

    h2: {
        fontSize: '3rem',
        textAlign: 'center'
    },

    p: {
        fontSize: '1.9rem',
        textAlign: 'center'
    }
}

export default Main