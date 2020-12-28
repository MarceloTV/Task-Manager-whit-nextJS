import React,{ Component } from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import Tasks from '../components/Tasks'

//Firebase Config
import Firebase from '../conf/firebase.conf'

//Styles CSS
import stylesCss from '../styles/Views/Main.module.css'

class Main extends Component{

    //Firebase initialized
    firebase = Firebase()

    state = {
        //This state contain if the user is logged and the user uid
        isLogged: false,
        user: null
    }

    componentDidMount(){
        //check if the user is logged
        this.firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({
                    isLogged: true,
                    user: user.uid
                })
            }else{
                this.setState({
                    isLogged: false,
                    user: null
                })
            }
        })

        //Request the notification permission
        Notification.requestPermission().then( data => {
            this.forceUpdate()
        }).catch(err => {
            alert("You need activate the notifications to advert some task")
        })
    }

    render(){
        {/* If the user is logged show ths tasks component else show other elements */}
        return <main className={`${stylesCss.main}`} style={styles.main}>
            {this.state.isLogged ? 
                <Tasks user={this.state.user}/>
            :
                <div className="w-50">
                    <h2 className={`${stylesCss.h2}`} style={styles.h2}>Do you have not logged yet?</h2>
                    <p className={`${stylesCss.p}`} style={styles.p}>well, SigIn or SignUp right now</p>
                    <div className={`w-50 mx-auto d-flex justify-content-around ${stylesCss.btn_content}`}>
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