import React from "react"
import Recipe from './components/Recipe'
import Pagination from './components/Pagination'

export default function App() {
//Setting Recipes Variables
const [recipes,setRecipes]= React.useState([])


//Fetching Recipes
function fetchRecipes(){
fetch('https://dummyjson.com/recipes?limit=50')
.then(res => res.json())
.then(data=>{
  if(data && data.recipes){
    setRecipes(data.recipes)
  }
})
}
React.useEffect(()=>fetchRecipes(),[])


//Setting Pages Variables
const [page,setPage]= React.useState(1)




// Setup the breakpoint variable
let breakpoint;
// Get the current breakpoint
var getBreakpoint = function () {
	return window.innerWidth;
};

// Calculate breakpoint on page load
breakpoint = getBreakpoint();
// Recalculate breakpoint on resize
window.addEventListener('resize', function () {
	breakpoint = getBreakpoint();
  defineItems();
}, false);

var mobile = 576;
var tablet = 992;
let gridContainer= document.getElementsByClassName('cards-container')
const defineItems=()=>{
  if (breakpoint < mobile) {
    gridContainer[0].style.gridTemplateColumns= " 1fr";
  }
  else if (breakpoint < tablet) {
    gridContainer[0].style.gridTemplateColumns= " 1fr 1fr";
  }
  else {
    gridContainer[0].style.gridTemplateColumns= " 1fr 1fr 1fr";
  }
  } 



//Mapping Recipe Elements in pages
const recipeElements=recipes.slice(page * 9 - 9, page * 9).map(element => {
  return (
      <Recipe 
      key={element.id}
      item={element}
      />
  )
})

//Function to select page
const pageSelector= (selectedPage)=>{
  if (selectedPage !== page){
    setPage(selectedPage)
  }
}


  return (
    <div className="App" >
      <div class='container bg-dark text-center'>
        <h2 class='text-light pt-3 pb-3'> Recipes Album</h2>
        <p class='text-light'>Fetching data from https://dummyjson.com/recipes</p>
        <Pagination recipes={recipes}
        pageSelector={pageSelector} page={page} />
        <div className='cards-container'>
          {recipeElements}
        </div>
        <Pagination recipes={recipes}
        pageSelector={pageSelector} page={page} />
      </div>
    </div>
  );


  }
