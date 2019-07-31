const URL = "https://acme-users-api-rev.herokuapp.com/api/"
const head = document.querySelector('thead');
const title = document.querySelector('#title');
const tbody = document.querySelector('tbody');
const companies = document.querySelector('#companies') ;
const products = document.querySelector('#products') ;
const tabs = document.querySelectorAll('.nav-link');



const loadData = (URL) => {
    axios.get(URL)
    .then(response => {
        //adding table header
        const titles = Object.keys(response.data[0]);
        let titleHtml = '';
        titles.forEach( title => {
            titleHtml += `<th scope='col'>${title[0].toUpperCase()}${title.slice(1)}</th>`
        });
        head.innerHTML = titleHtml;

        //adding table body
        let bodyHtml = '';
        
        response.data.map(ele => {
            let rowHtml = '<tr>'
            titles.map(title => {
                rowHtml += `<td>${ele[title]}</td>`
            });
            bodyHtml += `${rowHtml}</tr>`

        });

        tbody.innerHTML = bodyHtml;

    })
}

//set default page
window.addEventListener('load', loadData(`${URL}companies`))

tabs.forEach(tab => {
    tab.addEventListener('click', () => {

    tabs.forEach((nav) => {
        nav.classList.remove('active')
    })
        
    loadData(`${URL}${window.location.hash.slice(1)}`);
    tab.classList.toggle('active');
    });
})