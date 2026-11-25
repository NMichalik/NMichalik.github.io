/*
Load Shared Components
*/

function loadComponent(id, file) {
    const element = document.getElementById(id);

    if (!element) return;

    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Unable to load ${file}`);
            }
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
        })
        .catch(error => console.error(error));
}

loadComponent('header', '/header.html');
loadComponent('footer', '/footer.html');