document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form")
//when the submit button is pressed
    form.addEventListener('submit', (event) => {
        //prevents default behaviour of the form
        event.preventDefault();
        //takes whatever was input in the field
        const users = event.target.search.value
        //selects the users-list in html
        const ul = document.querySelector('#user-list')
        //clears the content of the ul
        ul.innerHTML = null

        //initiates a fetch request to the github api including the value provided in the input field 
        fetch(`https://api.github.com/search/users?q=${users}`)
        //converst the response to json
        .then((response) => response.json())
        //parses the json object to contain the search results
        .then( (objects) => {
        //for iterates over the array 
            for (let i = 0; i < objects.items.length; i++) { 
                // creates an anchor element  
                const userName = document.createElement('a') 
                //sets the id to username
                    userName.id = 'username'
                // creates an img element to show the users avatar
                const avatar = document.createElement('img')
                //creates a list to hold username and avatar
                const li = document.createElement('li')
        
                userName.textContent = `${objects.items[i].login}`
                avatar.src = `${objects.items[i].avatar_url}`
                avatar.alt = `user_avatar`
                
                ul.appendChild(li)
                li.appendChild(userName)
                li.appendChild(avatar)
            }
        })   
        
     
        form.reset()
    })
})