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

const filterButtons = document.querySelectorAll('.filter-btn');

const projectCards = document.querySelectorAll(
    '.featured-project, .project-card'
);

filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });

        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        const selectedFilter = button.dataset.filter;

        projectCards.forEach(project => {

            const categories = (
                project.dataset.category || ''
            ).split(' ');

            project.hidden = !(
                selectedFilter === 'all' ||
                categories.includes(selectedFilter)
            );

        });

        document.querySelectorAll(
            '.featured-section, .projects-section'
        ).forEach(section => {

            const visibleProjects = section.querySelectorAll(
                'article[data-category]:not([hidden])'
            );

            section.hidden = visibleProjects.length === 0;

        });

    });

});