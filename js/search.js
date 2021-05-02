const searchForm  = document.querySelector(".js-search"),
      searchInput = searchForm.querySelector(".search-input"),
      searchBtn   = searchForm.querySelector(".fa-search");

function handleSubmit(event) {
    event.preventDefault();
    
    if (searchInput.value.length > 0) {
        window.open(`https://www.google.com/search?q=${searchInput.value}`, "_blank");
        //window.location.replace(`https://www.google.com/search?q=${searchInput.value}`);
        searchInput.value = "";
    }
}

function init() {
    searchForm.addEventListener("submit", handleSubmit);
    searchBtn.addEventListener("click", handleSubmit);
}

init();