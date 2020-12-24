import React,{ useEffect, useState } from 'react'
import firebase from 'firebase'

function Firebase() {
    try{
        var firebaseConfig = {
            apiKey: "AIzaSyBYNf8d2bbZC55LNA-B3rChfDpWOS58Ixk",
            authDomain: "store-f42c8.firebaseapp.com",
            projectId: "store-f42c8",
            storageBucket: "store-f42c8.appspot.com",
            messagingSenderId: "527568472092",
            appId: "1:527568472092:web:342dea10fc14f14fd677d9"
        };

        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
        }else{
            firebase.app()
        }
    }catch(err){
        console.log(err)
    }

    return firebase
}

export default Firebase