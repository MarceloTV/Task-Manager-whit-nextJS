import React,{ Component } from 'react'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'

//Firebase config
import Firebase from '../conf/firebase.conf'

//Styles for tasks
import styles from '../styles/Components/Tasks.module.css'

class  Tasks extends Component{

    state = {
        //the state "tasks" is to store the tasks and the state "open" is to open or close the dialog
        tasks: [],
        open: false
    }

    //Initialize firebase ehit firestore
    firebase = Firebase().firestore()

    //this property will be for check the time to notify the tasks
    checkTasks = null

    //Delete Task
    deleteTask = async (e,id) => {
        e.currentTarget.disabled = true
        try{
            const taskAction = await this.firebase.collection("tasks").doc(id).delete()
            console.log("ok")
            this.getTask(this.props.user)
        }catch(error){
            console.log(error)
        }
    }

    //Add Task
    addTask = (e) => {
        e.preventDefault()
        const [task_name,task_time,task_date] = [
            e.currentTarget.task_name.value,
            e.currentTarget.task_time.value,
            e.currentTarget.task_date.value
        ]

        const data_time = {
            date: task_date.split("-").reverse()[0],
            month: task_date.split("-").reverse()[1],
            year: task_date.split("-").reverse()[2],
            hour: task_time.split(":")[0],
            minutes: task_time.split(":")[1]
        }

        const time = {
            hour: new Date().getHours(),
            minutes: new Date().getMinutes(),
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate()
        }

        //Check if the time is correct
        if(data_time.year < time.year){
            alert("Put the correct Time")
            return false
        }else if(data_time.year == time.year){
            if(data_time.month < time.month){
                alert("Put the correct Time")
                return false
            }else if(data_time.month == time.month){
                if(data_time.date < time.day){
                    alert("Put the correct Time")
                    return false
                }else if(data_time.date == time.day){
                    if(data_time.hour < time.hour){
                        alert("Put the correct Time")
                        return false
                    }else  if(data_time.hour == time.hour){
                        if(data_time.minutes < time.minutes){
                            alert("Put the correct Time")
                            return false
                        }
                    }
                }
            }
        }
        
        document.querySelector('#save').disabled = true
        this.firebase.collection("tasks").add({
            task_name,
            task_time,
            task_date,
            user: this.props.user
        }).then(data => {
            console.log('ok',data)
            document.querySelector('#save').disabled = false
            this.getTask(this.props.user)
        }).catch(data => {
            console.log('error',data)
        })
    }

    //Get all user tasks
    getTask = async (user) => {
       try{
        const data = await this.firebase.collection("tasks").where("user","==",user).get()
        let tasks = []
        data.forEach(v => {
            tasks.push({...v.data(),id: v.id,notified: false})
            console.log(v.data())
        })
        console.log(tasks)
        this.setState({open: false,tasks})
       }catch(error){
           console.log(error)
       }
    }

    componentDidMount(){
        this.getTask(this.props.user)
        
    }

    componentDidUpdate(){
        //Create the Notification if there is a permission and there are tasks
        if(Notification.permission != "default" && this.state.tasks != 0){
            this.checkTasks = setInterval(() => {
                this.state.tasks.forEach((v,i) => {
                    const time = {
                        hour: new Date().getHours(),
                        minutes: new Date().getMinutes(),
                        year: new Date().getFullYear(),
                        month: new Date().getMonth() + 1,
                        day: new Date().getDate()
                    }

                    const data_time = {
                        date: v.task_date.split("-").reverse()[0],
                        month: v.task_date.split("-").reverse()[1],
                        year: v.task_date.split("-").reverse()[2],
                        hour: v.task_time.split(":")[0],
                        minutes: v.task_time.split(":")[1]
                    }

                    //Check when launch the task noyification
                    if(data_time.year == time.year){
                        if(data_time.month == time.month){
                            if(data_time.date == time.day){
                                if(data_time.hour == time.hour){
                                    if(data_time.minutes == time.minutes){
                                        if(!v.notified){
                                            const notification = new Notification(`${v.task_name} still to be complete`)
                                            let tasks = this.state.tasks

                                            //Update the property notified of the task for no repeate this action
                                            tasks[i].notified = true
                                            this.setState(tasks)
                                        }
                                    }
                                }
                            }
                        }
                    }

                })
            },1000)
        }
    }

    componentWillUnmount(){
        clearInterval(this.checkTasks)
    }

    render(){
        return <div className={`w-50 ${styles.appContent}`}>

            {/* Dialog To add tasks */}
            <Dialog open={this.state.open} aria-labelledby="simple-dialog-title">
                <DialogTitle id="simple-dialog-title">Add Task</DialogTitle>

                <DialogContent>
                    <DialogContentText>Type your new task data</DialogContentText>
                    <form onSubmit={this.addTask}>
                        <TextField 
                            margin="dense"
                            name="task_name"
                            type="text"
                            label="Task name"
                            fullWidth
                        />

                        <TextField 
                            margin="dense"
                            name="task_time"
                            type="time"
                            fullWidth
                        />

                        <TextField 
                            margin="dense"
                            name="task_date"
                            type="date"
                            fullWidth
                        />
                        <div className="mt-2 w-50 d-flex justify-content-around">
                            <Button variant="contained" color="secondary" type="button" onClick={() => this.setState({...this.state,open: false})} >
                                Cancel
                            </Button>

                            <Button variant="contained" color="primary" type="submit" id="save">
                                Save
                            </Button>
                        </div>
                    </form>

                    
                </DialogContent>
            </Dialog>

            <div className="d-flex w-100 justify-content-between align-items-center">
                <h1>Tasks' Table</h1>
                {/* Button to open the dialog */}
                <Button variant='contained' onClick={() => this.setState({...this.state,open: true})}>
                    ➕
                </Button>
            </div>

            <TableContainer component={Paper} style={{height: 400,overflowX: 'auto'}}>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Task Name</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Task Time</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Task Date</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* Tasks */}
                        {this.state.tasks.map((v,i) => <TableRow key={i}>

                                <TableCell>{v.task_name}</TableCell>
                                <TableCell>{v.task_time}</TableCell>
                                <TableCell>{v.task_date.split("-").reverse().join("-")}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={(e) => this.deleteTask(e,v.id)}>
                                        Complete
                                    </Button>
                                </TableCell>

                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div> 
        
    }
}

export default Tasks