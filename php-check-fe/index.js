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
    course_button.addEventListener('click', create_course)
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

        let url = 'http://localhost/php-check/php-check-be/sort.php?numbers=' + encodeURIComponent(numbers_string);
        console.log(url);
        
        axios.get(url).then(response => {
            console.log(response.data)
            const sorted_numbers = response.data
            display_result.innerHTML = sorted_numbers
        }).catch(error => console.error(error))

        
    }  

    function check_palindrome(){
        event.preventDefault()
        let palindrome_string = document.getElementById('user_palindrome_input').value
        let display = document.getElementById('palindrome-output')

        display.innerHTML = palindrome_string + " is " + palindrome(palindrome_string)

        function palindrome_helper(string, begin, end) {
            //will check if the begin and and end character are equal and each time begin will
            //increment and end will decrement until begin is bigger than end
            console.log(string, begin, end)
            if (string[begin] != string[end]) {
                return false;
            } else if (string.length == 1) {

                return true;
            } else if (begin > end) {
                return true;
            } else {
                return palindrome_helper(string, begin + 1, end - 1)
            }
        }

        function palindrome(string) {
            return palindrome_helper(string, 0, string.length - 1)
        }
    }

    function check_prime_age(){
        let year_of_birth = document.getElementById('user_prime_input').value
        let age = new Date().getFullYear() - parseInt(year_of_birth)
        let display = document.getElementById('prime-output')
        age=parseInt(age)
        console.log(age)

        if(is_prime(age)){
            display.innerHTML = `Nice, You are ${age} years old, which is a prime number`
        }else{
            display.innerHTML = `Nice, You are ${age} years old, but it isn't a prime number`
        }

        function is_prime(age_input){
            let is_prime = true
            for(let i = 2; i<= age/2; i++){
                if(age_input % i==0){
                    is_prime=false
                    break;
                }
            }
            return is_prime
        }
    }

    function create_course(){
        event.preventDefault()
        class Course{
                constructor(code, instructor, name, credits){
                this.code = code
                this.instructor = instructor
                this.name = name
                this.credits = credits
            }
        }
        let c_code = document.getElementById('c_code').value
        let c_instructor = document.getElementById('c_instructor').value
        let c_name = document.getElementById('c_name').value
        let c_credits = document.getElementById('c_credits').value
        let display = document.getElementById('course_result')

        let course = new Course(c_code, c_instructor, c_name, c_credits)
        console.log(course.code, course.instructor, course.name , course.credits)
        display.innerHTML = `This course ${course.name} with ${course.instructor} seems borring that is why you are ditching to play in the Javascript playground. I can suggest the FSW as a replacement BEST BOOTCAMP EVER`
    }

    function reverse_numb_string(){
        let string_input = document.getElementById('magic_input').value
        let display = document.getElementById('magic-output')

        //regular expression for digits
        let digit_check = /\d/
        let digits = []
        let index = []
        let string_array = string_input.split('')
        //check if a character is a digit, if yes will push it to the array
        //also pushing the indexes for time complexity
        for (let i = 0 ;i <string_array.length; i++){
            if(digit_check.test(string_array[i])){
                digits.push(string_array[i])
                index.push(i)
            }
        }
        //put the last number of the array where we found the first one
        for(let i = 0;i<index.length;i++){
            string_array[index[i]]=digits.pop()
        }

        //retransform the array to a string
        let string_output = string_array.join("")
        display.innerHTML =string_output +  '<br>HAHAHHAHA numbers in the string are reversed :p , I was bored when I did this <br> if Charbel saw this I am so happy in the bootcamp'

    }

    function consonant_switch(){
        let consonant_input = document.getElementById('consonant_input').value
        let display = document.getElementById('consonant-output')
        let index=0
        check_first_consonants(consonant_input)

        //cut the strin at the vowel index we found, put it in the end and add ay
        let changed_consonants = consonant_input.slice(index) + consonant_input.slice(0, index) + "ay" 
        console.log(changed_consonants)
        
        display.innerHTML = changed_consonants + '<br> Yup I am really bored hope I get a good grade for this assignement'

        function check_vowel(char){
            //check if vowe
            return ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase())
        }
        
        function check_first_consonants(string){
            for (let i = 0; i<string.length; i++){
                if(check_vowel(string[i])){
                    index=i
                    break
                }
            }
        }
    }

    function move_image(){
        let img = document.getElementById("loghouse")
        let position = 0
        //set an interval in which the image will move in
        let id = setInterval(frame, 50)
        
        function frame() {
            //check if it reached the end
            if (position == 350) {
                clearInterval(id)
            } else {
                position++
                img.style.left = position + 'px'
            }
        }
    }
    function show_image() {
        var img = document.getElementById("loghouse")
        img.style.display = "inline-block"
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