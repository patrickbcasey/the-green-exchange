document.querySelector("#searchButton").addEventListener('click', search)

function search() {
    const query = document.querySelector("#search").value.trim() || ""
    document.querySelector('#searchButton').href = `/search/${query}`
    console.log(query)
}
