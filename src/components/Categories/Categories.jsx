import { useContext, useState } from "react"
import { CategoriesContext } from "../../context/CategoriesContext";


export default function Categories() {
  const { categories , supcategories } = useContext(CategoriesContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  return <>

  <h2 className="text-3xl text-text font-semibold ">Featured Categories</h2>
 <div  className=" cursor-pointer grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 ">
{categories?.map((category) => ( 
  <div

  key={category._id}
onClick={() => {
  setSelectedCategory(category);
  document.getElementById("categoryModal").showModal();
}}
  className=" bg-neutral-primary-soft w-full min-h-64 block max-w-sm border border-default rounded-base shadow-md shadow-gray-300 text-text hover:text-mincolor">
    <a >
      <img className=" w-full h-64 object-contain rounded-t-base" src={category.image} alt={category.name} />
    </a>
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold">{category.name}</h2>
    </div>
  </div>

  ))}

   </div>
     {/* // كارت */}
<dialog
  id="categoryModal"
className="hidden open:flex fixed inset-0 flex-col gap-4 m-auto w-[90vw] max-w-125 min-h-100 max-h-[90vh] overflow-y-auto rounded-xl p-4 shadow-xl backdrop:bg-black/50"
onClick={(e)=>{
    if (e.target === e.currentTarget) {
    e.currentTarget.close();
  }
}
  
}

>
  {selectedCategory && (
    <>
    <div className=" flex flex-row  gap-4 font-bold text-center justify-between items-center flex-1"> 


   
    
    <div className=" flex flex-col gap-2 font-bold text-center ">
   <h2 className=" pt-9 text-2xl  text-mincolor">
        {selectedCategory.name}
      </h2>
      <h2 className="text-left text-text">
        {selectedCategory.slug}
      </h2>
    </div>
   

    {selectedCategory.image && (
  <img
    src={selectedCategory.image}
    alt={selectedCategory.name}
    className="w-3/5 h-64 object-contain"
  />
)}
       </div>
<button className="self-end mt-2 bg-mincolor text-white font-semibold px-8 py-2 rounded-lg shadow-md hover:opacity-80 transition duration-300 cursor-pointer" onClick={() => document.getElementById("categoryModal").close()}>
  close
</button>
     
<button
  onClick={() =>
    document.getElementById("categoryModal").close()
  }
  className="cursor-pointer absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
>
  &times;
</button>

    </>
  )}
</dialog>
{/*********************** Subcategories ***********************/}
<h2 className="text-3xl text-text font-semibold mt-10">
  Subcategories
</h2>
 <div  className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
{supcategories?.map((category) => ( 
  <div

  key={category._id}
  onClick={() => {
  setSelectedCategory(category);
  document.getElementById("categoryModal").showModal();
}}

  className=" min-h-24 flex items-center justify-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-text text-center hover:text-mincolor hover:border-mincolor hover:shadow-md transition duration-300 cursor-pointer">
 
   
      <h2 className="text-base md:text-lg font-semibold">{category.name}</h2>
    
  </div>

  ))}

   </div>
{/*********************** SubCategories On Category ***********************/}
{/* <h2 className="text-3xl text-text font-semibold mt-10">
  Subcategories On Category
</h2>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
  {supcategoriesoncategory?.map((category) => (
    <div
      key={category._id}
      className="min-h-24 flex items-center justify-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-text text-center hover:text-mincolor hover:border-mincolor hover:shadow-md transition duration-300"
    >
      <h2 className="text-base md:text-lg font-semibold">
        {category.name}
      </h2>
    </div>
  ))}
</div> */}
  </>
   
}
