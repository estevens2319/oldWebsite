window.onload = function(){
document.getElementById('searchbar').addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchbutton").click();
  }
});
}


function do_stuff() {
    testSearch = document.getElementById('searchbar').value
    testSearch=testSearch.toLowerCase();
    window.sessionStorage.setItem("query", testSearch);
}

document.getElementById('search').innerHTML = window.sessionStorage.getItem("query");

