export class Timer{
    constructor(timeInput, startBtn, pauseBtn, resetBtn, callBacks){
        this.timeInput = timeInput;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;
        this.resetBtn = resetBtn;
        this.interval = '';
        this.timeRemaining = this.timeRemaining || 0;
        this.status = 0;
        
        this.startBtn.classList.add('show-btn')
        
        this.startBtn.addEventListener('click', this.start)
        this.pauseBtn.addEventListener('click', this.pause)
        this.resetBtn.addEventListener('click', this.reset)
        this.timeInput.addEventListener('input', this.inputLimit)
        
        if(callBacks){
            this.onStart = callBacks.onStart;
            this.onTick = callBacks.onTick;
            this.onPause = callBacks.onPause;
            this.onComplete = callBacks.onComplete;
            this.onReset = callBacks.onReset;
        }
    }
    start = () =>{
        this.startBtn.classList.remove('show-btn')
        this.pauseBtn.classList.add('show-btn')
        if(this.status === 0){
            this.status = 1 
           
            // hide start btn and display pause bnt
            if(this.onStart){
                this.onStart(this.timeRemaining)
            }
        }
        this.totalTime = this.timeRemaining
        this.tick()
        this.interval = setInterval(this.tick, 20)
    }
    pause = ()=>{
        if(this.status === 1){
            // hide start btn and display pause bnt
            this.startBtn.classList.add('show-btn')
            this.pauseBtn.classList.remove('show-btn')
        }
        if(this.onPause){
            this.onPause(this.timeRemaining)
        }
        clearInterval(this.interval)
        
    }
    tick = () =>{
        if(this.timeRemaining <= 0 ){
            this.pause()
            if(this.onComplete){
                if(this.status === 1){
                    this.status = 0
                    this.onComplete()
                }
                this.timeRemaining = 0;
            }
        }else {
            this.timeRemaining = this.timeRemaining - 0.02;
            if(this.onTick){
                this.onTick(this.timeRemaining)
            }
        }
    }
    reset = ()=>{
        // if(this.status === 1){
        //     this.status = 0
        // }
        if(this.onReset){
            this.onReset()
        }
        this.status = 0;
        this.pause()
        this.timeRemaining = 0;
        this.startBtn.classList.add('show-btn')
        this.pauseBtn.classList.remove('show-btn')
    }
    inputLimit = ()=>{
        if(this.timeInput.value.length >= 6){
            const value1 = this.timeInput.value.slice(0, 3)
            const value2 = this.timeInput.value.slice(-2)
            const valueReduction = value1 +'.'+ value2
            this.timeInput.value = valueReduction
        }
    }
    get timeRemaining(){
        return parseFloat(this.timeInput.value)
    }
    set timeRemaining(time){
        
            this.timeInput.value = time.toFixed(2);
        
    } 
}