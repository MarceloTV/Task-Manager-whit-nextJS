import React,{ Component } from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'

//Firebase Config
import Firebase from '../conf/firebase.conf'

//Styles to the Header
import styles from '../styles/Components/Header.module.css'

class Header extends Component {

    state = {
        //State to know if the user is logged
        isLogged: false
    }

    //Initialize the firebase config
    firebase = Firebase()

    //LogOut Function
    logOut = () => {
        this.firebase.auth().signOut().then(() => {
            this.setState({
                isLogged: false
            })
        })
    }

    componentDidMount(){

        //Chechk if the user is Auth
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

            {/* Logo */}
            <Link href="/">
                <h1 className="mb-0" style={{cursor: 'pointer'}}>Task Manager</h1>
            </Link>

            <nav className={`d-flex justify-content-around ${styles.nav}`}>
                {/* If is logged show a logout button else show a SignIn or SignUp button */}
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