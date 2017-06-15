function clickHandle() {
  var b = a.c
}

tryJS.config({
  handleError: function() {
    console.log('you found me')
  }
})

clickHandle = tryJS.wrapFunction(clickHandle)
document.querySelector('.send').addEventListener('click', clickHandle)


function goHome(type, callback) {
  console.log(type)

  callback()
}

// goHome = tryJS.wrapFunction(goHome)
// goHome(4, function() {
//   console.log('done')
//   console.log(ming = tian)
// })

(tryJS.wrapArgs(goHome))(4, function() {
  console.log('done')
  console.log(ming = tian)
})
