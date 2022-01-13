export class TimerAnimation {
    constructor(circle, circlePath){
        this.circle = circle;
        this.circlePath = circlePath;
        this.ratio = this.circle.getAttribute('r');
        this.perimeter = this.calcPerimeter();
        this.offsetDown = 0
        this.totalDuration = 0
        
    }
    calcPerimeter = () => {
        return parseFloat((2*Math.PI*this.ratio).toFixed(2))
    }
    renderOffset = () =>{
        this.circle.setAttribute('stroke-dasharray', this.perimeter)
        this.circle.setAttribute('stroke-dashoffset', this.offsetDown)
    
    }
    countingDownAnimation = (timeRemaining) =>{
        this.offsetDown = parseFloat(((this.perimeter * timeRemaining) / this.totalDuration - this.perimeter).toFixed(2));
        this.circle.setAttribute('stroke-dashoffset', this.offsetDown)
    }
    resetOffset(){
        this.circle.setAttribute('stroke-dashoffset', 0)
    }
    completed(){
        this.circle.setAttribute('stroke-dashoffset', this.perimeter)
        this.circle.setAttribute('stroke-dashoffset', 0)
        
    }
    onCompleteAnimation(){
        this.circlePath.classList.add('on-completed')
        setTimeout(()=>{
            this.circlePath.classList.remove('on-completed')
            console.log('removed');
        },3100)
    }

}