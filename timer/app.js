import { Timer } from './timer.js'
import { TimerAnimation } from './timerAnimation.js'

const timerInput = document.querySelector('#timer-input')
const timerStartBtn = document.querySelector('#timer-start')
const timerPauseBtn = document.querySelector('#timer-pause')
const timerResetBtn = document.querySelector('#timer-reset')
const timerCircleElement = document.querySelector('#timer-circle')
const timerCirclePath = document.querySelector('#svg-timer')


const timerCircle = new TimerAnimation(timerCircleElement, timerCirclePath)


const timer = new Timer(timerInput, timerStartBtn, timerPauseBtn, timerResetBtn, {
    onStart(initialDuration){
        timerCircle.renderOffset()
        timerCircle.totalDuration = initialDuration
    },
    onPause(timeRemainig){
    },
    onTick(timeRemaining){
        timerCircle.countingDownAnimation(timeRemaining)
    },
    onComplete(){
        timerCircle.completed()
        timerCircle.onCompleteAnimation()
    },
    onReset(){
        timerCircle.resetOffset()
    }
})

