document.querySelector("#searchButton").addEventListener('click', search)
document.querySelector("#searchForm").addEventListener('submit', enter)


function search() {
    const query = document.querySelector("#search").value.trim() || ""
    document.querySelector('#searchButton').href = `/search/${query}`
}

function enter() {
    const query = document.querySelector("#search").value.trim() || ""
    document.querySelector('#searchForm').action = `/search/${query}`
}