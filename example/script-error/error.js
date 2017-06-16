function clickHandle() {
  var b = a.c
}

console.log(jstracker)

jstracker.config({
  handleCatchError: function(data) {
    console.log(data.stack)
  }
})

var clickHandleTry = jstracker.tryJS.wrap(clickHandle)
document.querySelector('.send').addEventListener('click', clickHandleTry)


function goHome(type, callback) {
  console.log(type)

  callback()
}

// goHome = tryJS.wrap(goHome)
// goHome(4, function() {
//   console.log('done')
//   console.log(ming = tian)
// })

(jstracker.tryJS.wrapArgs(goHome))(4, function() {
  console.log('done')
  ming = tian
})
