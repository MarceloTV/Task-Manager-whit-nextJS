import React,{ Component } from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

import Firebase from '../conf/firebase.conf'

import styles from '../styles/Components/Header.module.css'

class Header extends Component {

    state = {
        isLogged: false
    }

    firebase = Firebase()

    logOut = () => {
        this.firebase.auth().signOut().then(() => {
            this.setState({
                isLogged: false
            })
        })
    }

    componentDidMount(){
        this.firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({
                    isLogged: true
                })
            }
        })
    }

    render(){
        return <header className={`w-100 p-1 d-flex justify-content-between align-items-center ${styles.header}`}>
            <Link href="/">
                <h1 className="mb-0" style={{cursor: 'pointer'}}>Task Manager</h1>
            </Link>

            <nav className="d-flex justify-content-around" style={{width: '15%'}}>
                {this.state.isLogged ? 
                    <Button onClick={this.logOut} variant="contained" color="secondary">
                        LogOut
                    </Button>

                    :

                    <>
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
                    </>
                }
            </nav>
        </header>
    }
}

export default Header