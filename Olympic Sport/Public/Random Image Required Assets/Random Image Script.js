// -----JS CODE-----
// Made by Brandon / Apoc
// youtube.com/c/apocthelegend
// tutorial: https://youtu.be/8dwv_SrQ6Ic
// snapchat: brandonrules13

//@input Asset.Material randomImageMaterial
//@input Asset.Texture[] images
//@input float changeDelay = 0.005 {"widget":"slider", "min":0.0, "max":0.4, "step":0.005}
//@input float hintShowTime = 1 {"widget":"slider", "min":0.0, "max":3, "step":0.1}
//@input string stopTriggerName
//@input string startTriggerName
//@input string stopHintText
//@input string startHintText
//@input Component.Text hintTextObject

var stop = false
var running = false

if (!script.randomImageMaterial) {
  print('Add the random image material back to the controller!')
  return
}
if (script.images.length < 1) {
  print('No Images added!')
  return
}

if (!script.hintTextObject) {
  print('Add the hint text back to the controller!')
  return
}

var hideHintDelay = script.createEvent('DelayedCallbackEvent')
hideHintDelay.bind(function() {
  hideHint()
})

function showHint(text) {
  script.hintTextObject.enabled = true
  script.hintTextObject.text = text
  hideHintDelay.reset(script.hintShowTime)
}

function hideHint() {
  script.hintTextObject.enabled = false
}

showHint(script.stopHintText)

function start(arr, mat, delay) {
  running = true
  var delayedEvent = script.createEvent('DelayedCallbackEvent')
  delayedEvent.bind(function() {
    mat.mainPass.baseTex = arr[(arr.length * Math.random()) | 0]
    if (!stop) {
      delayedEvent.reset(delay)
    }
  })
  delayedEvent.reset(0)
}

start(script.images, script.randomImageMaterial, script.changeDelay)

function onStopTrigger() {
  stop = true
  running = false

  var delay = script.createEvent('DelayedCallbackEvent')
  delay.bind(function() {
    showHint(script.startHintText)
  })
  delay.reset(0.5)
}
global.behaviorSystem.addCustomTriggerResponse(
  script.stopTriggerName,
  onStopTrigger
)
function onStartTrigger() {
  stop = false
  if (!running) {
    start(script.images, script.randomImageMaterial, script.changeDelay)
  }
}
global.behaviorSystem.addCustomTriggerResponse(
  script.startTriggerName,
  onStartTrigger
)
