import React,{ Component } from 'react'
import Form from '../components/Form'
import router from 'next/router'

import Firebase from '../conf/firebase.conf'

class SignUp extends Component{

    firebase = Firebase()

    handle = (e) => {
        e.preventDefault()
        if(e.currentTarget.password.value != e.currentTarget.re_password.value){
            alert("The password aren't equals")
            return false
        }
        this.firebase.auth().createUserWithEmailAndPassword(e.currentTarget.email.value,e.currentTarget.password.value)
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        this.firebase.auth().onAuthStateChanged(user => {
            if(user){
                router.push('/')
            }
        })

        return <main style={styles.main}>
            <Form handle={this.handle} inputs={inputs} title={"Type tour Data to SignUp"}/>
        </main>
    }
}

const inputs = [
    {
        placeholder: 'Type your email',
        type: 'email',
        name: 'email'
    },
    {
        placeholder: 'Type your password',
        type: 'password',
        name: 'password'
    },
    {
        placeholder: 'Re-enter your password',
        type: 'password',
        name: 're_password'
    }
]

const styles = {
    main: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}


export default SignUp