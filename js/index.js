
document.querySelector('#search').addEventListener('input', searchUser);
document.querySelector('#github-form').addEventListener('submit', searchUser);
//Event listener for the search input and form submission.
//Fetches GitHub API data for users based on the search query.
//The event object triggered by the input or form submission.
function searchUser(event) {
  event.preventDefault();
  let searchQuery = document.getElementById('search').value;
  let baseURL = `https://api.github.com/search/users?q=${searchQuery}`;
  fetch(baseURL)
      .then(response => response.json())

      .then(userData => {
          const userListElement = document.querySelector('#user-list');
          userListElement.innerHTML = ''; 
          if(userData.items.length > 0) {
          userData.items.forEach(user => {
              const userNameElement = document.createElement('h2');
              const avatar = document.createElement('img');
              const link = document.createElement('a');

              userNameElement.textContent = user.login;
              userNameElement.id = 'username';
              avatar.src = user.avatar_baseURL;
              link.href = user.html_baseURL;
              link.textContent = 'View Profile';

              const userContainer = document.createElement('li');
              userContainer.appendChild(userNameElement);
              userContainer.appendChild(avatar);
              userContainer.appendChild(link);

              userListElement.appendChild(userContainer);
          });
      } else {
          const userListElement = document.querySelector('#user-list');
          userListElement.innerHTML = ''; 
          const noResults = document.createElement('h2');
          noResults.textContent = 'No Results';
          userListElement.appendChild(noResults);

      }
      });
  document.getElementById('user-list').addEventListener('click', findRepos)

  function findRepos() {

      fetch(`https://api.github.com/users/${searchQuery}/repos`)
          .then(response => response.json())
          .then(userData => {
               const reposList = document.querySelector('#repos-list');

               userData.forEach(repo => {
                  const repoName = document.createElement('h2');
                  const repoLink = document.createElement('a');

                  repoName.textContent = repo.name;
                  repoLink.href = repo.html_baseURL;
                  repoLink.textContent = 'View Repo';

                  const repoContainer = document.createElement('li');
                  repoContainer.appendChild(repoName);
                  repoContainer.appendChild(repoLink);
                  reposList.appendChild(repoContainer);
              })

          })

  }

}