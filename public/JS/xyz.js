// console.log('We are in client side JavaScript');

// fetch('http://localhost:3000/weather?address=junagadh').then(function(response){
//     response.json().then(function(data){
//         if(data.error){
//             console.log(data.error);
//         }
//         else{
//             console.log(data.Location);
//             console.log(data.Temperature);
//             console.log(data.RealFeel)
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const userIp = document.querySelector('input');

const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', function(event){
    event.preventDefault();                 // prevents page from reseting after submitting the form so that we can                                         play with userIp

    const addressIp = userIp.value;
  
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + addressIp).then(function(response){
    response.json().then(function(data){
        if(data.error){
            // console.log(data.error);
            msg1.textContent = data.error
        }
        else{
            // console.log(data.Location);
            // console.log(data.Temperature);
            // console.log(data.RealFeel)
            msg1.textContent = 'The temperature in '+ data.Location +'is ' + data.Temperature;

            msg2.textContent = 'It feels like '+ data.RealFeel;
        }
    })
})
})