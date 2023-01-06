import { Button, BorderContent } from '../../shared/components'
import './style/style.css'
import  React,{useCallback, useRef} from 'react';

type config = {
    limit?:number;
    amount?:number;
    rest?:number
    long_rest?:number
}

type stateClock = "Pause" | "Start" ; 

type statePomodoro = "Work" | "Rest" ;

function Home({limit = 30,amount = 4,rest = 5,long_rest = 10}:config){
    const [second, setSecond] = React.useState(limit)
    const [blocks,setBlocks] = React.useState(0)
    const [cycles,setCycles] = React.useState(0)
    const [statePomodoro, setStatePomodoro] = React.useState<statePomodoro>("Work")
    const [stateClock, setStateClock] = React.useState<stateClock>("Pause")
    const totalWorking = useRef(0);

    
    React.useEffect(()=>{
        let cron = 0;
        eventPromodoro()
        switch (stateClock) {
            case "Start":
                cron = runningTime()
                break;
            case "Pause":
                  clearInterval(cron)
                break;
        }
        return () =>{
            clearInterval(cron)
        }
    },[stateClock, second,cycles])


    React.useEffect(()=>{
        console.log(cycles)
        if(statePomodoro == "Rest"){
            if(blocks   == (amount  * ( cycles + 1)) ){
                setCycles(cycles + 1)
                setSecond(long_rest)
            }else{
                
                setSecond(rest)
            }
        }
       
    },[blocks])

    const eventPromodoro = useCallback(()=>{
        switch (statePomodoro) {
                    case "Work":
                        workEvent()
                        break;
                    case "Rest":
                        restEvent()    
                    default:
                        break;
                }
    },[stateClock, second,cycles,blocks ])

 
   const startEvent =  useCallback(()=>{   
        setStateClock("Start")
    },[stateClock])

    const pauseTime = useCallback(()=>{
        setStateClock("Pause")
    },[stateClock])

    const runningTime = useCallback(()=>{
        return setInterval(()=>{
            if(statePomodoro == "Work"){
                totalWorking.current +=  1 
            }

            setSecond(second - 1)
          },1000)
    },[second]) 

    const workEvent = useCallback(()=>{

        if(second == 0){
            setBlocks(blocks + 1)          
            setStatePomodoro("Rest")
        }
        
    },[second,blocks])

    const restEvent = useCallback(()=>{
        if(second == 0){
            setSecond(limit)
            setStatePomodoro("Work")
            
        }
    },[second])

  
    
    const resetTime = useCallback(()=>{
        setSecond(limit)
        setCycles(0)
        setBlocks(0)
        setStateClock("Pause")
        totalWorking.current = 0
    },[second])

    const viewMinutes = useCallback((seconds:number) => {
        var date = new Date(0);
        date.setSeconds(seconds);
        return date.toISOString().substr(14,5);
    },[second]);

    return (
        <div className='content' style={{
            background: statePomodoro == "Work" ? "#30a0d4" :"#20e895",
            transition:'1s'
        }}>
            <BorderContent>
                <div className='title_time'>
                    <div className='title'>You are {(statePomodoro == "Work" ? "Working":"Resting")}</div>
                   <span className='time'>{viewMinutes(second)}</span> 
                </div>
                <div className='Button_option'>
                    <Button onClick={startEvent}>Start</Button>
                    <Button onClick={resetTime}>reset</Button>
                    <Button onClick={pauseTime}>Pause</Button>
                </div>
                <div className='Result'>
                    <h3>Details:</h3>
                    <div>Cycles:{cycles}</div>
                    <div>Total WorkTime:{viewMinutes(totalWorking.current)}</div>
                    <div>Time Blocks (pomodoros):{blocks}</div>
                </div>
            </BorderContent>
        </div>
    )
}


export {Home}