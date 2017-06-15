window.addEventListener('error', function(event) {
    console.log(event);
}, true);

window.onerror = function() {
    console.log(arguments);
    // return true;
};
