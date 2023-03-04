let button = document.getElementById('register_btn')
    
button.addEventListener('click', login_button)

function login_button() {
    let email = document.getElementById('e_mail').value
    let password = document.getElementById('pass_code').value
    
        //generate an ID and put the values in a JSON object
    let data = new FormData()
    data.append('email', email)
    data.append('password', password)

    axios.post('http://localhost/php-check/php-check-be/user-check.php', data).then(function (res) {
        console.log(res.data)

    }).catch(function (err) {
        console.log(err);
    })

}

   
   //the buttons of the page 
    let merge_button = document.getElementById('sort_button')
    let palindrome_button = document.getElementById('palindrome_button')
    let prime_button = document.getElementById('prime_button')
    let magic_button = document.getElementById('magic_button')
    let consonant_button = document.getElementById('consonant_button')
    let ip_button = document.getElementById('ip_button')
    let to_top_button = document.getElementById('to_top_button')
    let your_location = document.getElementById('your_location')
    
    //the event listener
    sort_button.addEventListener('click', sort_numbers)
    palindrome_button.addEventListener('click', check_palindrome)
    prime_button.addEventListener('click', check_prime_age)
    magic_button.addEventListener('click', reverse_numb_string)
    consonant_button.addEventListener('click', consonant_switch)
    ip_button.addEventListener('click', get_ip_address)
    to_top_button.addEventListener('click', scroll_top)
    get_location()

    //sort the array 
    function sort_numbers(event){
        event.preventDefault()
        let display_result = document.getElementById('result')
        display_result.innerHTML=""
        let numbers_input = document.getElementsByClassName('number_input')
        let numbers_string=""
        //storing the input in the array
        for (let i=0; i <numbers_input.length; i++){
            numbers_string += numbers_input[i].value+","
        }
        console.log(numbers_string)

        let url = 'http://localhost/php-check/php-check-be/sort.php?numbers=' + encodeURIComponent(numbers_string)
        
        axios.get(url).then(response => {
            console.log(response.data)
            const sorted_numbers = response.data
            display_result.innerHTML = sorted_numbers
        }).catch(error => console.error(error))
    }  

    function check_palindrome(event){
        event.preventDefault()
        let palindrome_string = document.getElementById('user_palindrome_input').value
        let display = document.getElementById('palindrome-output')

        let url = 'http://localhost/php-check/php-check-be/palindrome.php?string=' + encodeURIComponent(palindrome_string)
        console.log(url)
        axios.get(url).then(response => {
            console.log(response.data);
            let is_palindrome = response.data
            display.innerHTML = palindrome_string + " is " + is_palindrome
        })   
    }

    function check_prime_age(){
        let year_of_birth = document.getElementById('user_prime_input').value
        let display = document.getElementById('prime-output')
        console.log(year_of_birth)

        let data = new FormData()
        data.append('year_of_birth', year_of_birth)
        axios.post('http://localhost/php-check/php-check-be/prime.php', data).then(function(response) {
            console.log(response.data);
            let is_prime = response.data.is_prime
            let is_even = response.data.is_even
            if(is_prime){
                display.innerHTML = `Nice, You are ${response.data.age} years old, which is a prime number`
            }else{
                display.innerHTML = `Nice, You are ${response.data.age} years old, but it isn't a prime number`
            }
            if(is_even){
                display.innerHTML += `<br>you have an even age`
            }else{
                display.innerHTML += `<br>you have an odd age`
            }
        })  
    }

    function reverse_numb_string(){
        let string_input = document.getElementById('magic_input').value
        let display = document.getElementById('magic-output')
        let url = 'http://localhost/php-check/php-check-be/palindrome.php?string_input=' + encodeURIComponent(string_input)
        axios.get(url).then(response =>{
            console.log(response.data.string_output)
            let string_output = response.data.string_output
            display.innerHTML = string_output
        })
    }

    function consonant_switch(){
        let consonant_input = document.getElementById('consonant_input').value
        let display = document.getElementById('consonant-output')

        let data = new FormData()
        data.append('consonant_input', consonant_input)
        let url = 'http://localhost/php-check/php-check-be/consonant.php'
        axios.post(url, data).then(response => {
            console.log(response)
            console.log(response.changed_consonants)
            display.innerHTML = response.data 
        })
    }


    function get_ip_address(){
        let display = document.getElementById('ip_output')
        let sum_IP = 0
        //get the IP address transform it to an objet than a string
        fetch('https://api.ipify.org/?format=json').then(response => response.json()).then(data => {const IP_address = data.ip
            console.log(typeof IP_address, IP_address)
            for(let i = 0; i<IP_address.length; i++){
                if(parseInt(IP_address[i])%2==0){
                    sum_IP += parseInt(IP_address[i])
                }
            }
          display.innerHTML = IP_address + '<br> and for fun here is the sum of the even number of your IP address <br>' +sum_IP 
        })
    }

    function get_location(){
        //if we have the location we get the position
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(show_position);
        } else {
            your_location.innerHTML = "So you value your privaacy";
        }
    }
    //get the latitude and longitude and display them in the html
    function show_position(position) {
        your_location.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude
    }
      
    //get you to the top
    function scroll_top(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }