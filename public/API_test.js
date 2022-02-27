// fetch users from the people API
const result = document.querySelector('.result');
const fetchUsers = async () => {
    fetch('/api/people', { method: 'GET' })
    .then((res) => res.json())
    .then(data => {
        // console.log(data.data)
        const people = data.data.map((person) => {
            // console.log(person)
            return `<li>${person.name}</li>`;
        })
        result.innerHTML = people.join('')  // join method transform an array to string with the patter passed as argument
    })
    .catch((err) => {
        result = `<div><p>There was an error while fetching data</p></div>`
    });
}

fetchUsers();

// POSTing new person
const inputField = document.querySelector('#name')
const subitBtn = document.querySelector('button');
subitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const nameValue = inputField.value;

    // making a post request to the API
    fetch('/api/people', {
        method: 'POST',
        body: JSON.stringify({
            name: nameValue,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
    .then((response) => response.json())
    .then(data => {
        // HTMLElement to hold the newly created person
        const li = document.createElement('li');
        // putting the content of the response into the created element
        li.textContent = data.newPerson.name;
        // adding that element to the result element as it contains other people
        result.appendChild(li);
    })
    .catch((err) => console.log(err))
});
