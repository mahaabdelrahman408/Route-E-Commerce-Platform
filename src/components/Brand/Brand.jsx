import axios from "axios";
import { useEffect, useState } from "react";



export default function Brand() {

    const [brand, setBrand] = useState([]);
      const [selectedCategory, setSelectedCategory] = useState(null);

      //******************* Get All Brands *******************
        useEffect(() => {
      async function getAllBrand() {
        try { const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/brands"
       
        );
        setBrand(data.data);
        // console.log("All Brand ", data.data);
      } catch (err) {
        console.error(err);
      } 
      }
  
      getAllBrand();
    }, [])

  return <>
  <h2 className="text-3xl text-text font-semibold ">All Brands</h2>

 <div  className=" cursor-pointer grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 ">
{brand?.map((brand) => ( 
  <div

  key={brand._id}
onClick={() => {
  setSelectedCategory(brand);
  document.getElementById("categoryModal").showModal();
}}
className="bg-neutral-primary-soft w-full max-w-xs border border-default rounded-base shadow-md shadow-gray-300 text-text hover:text-mincolor"  >
    <a >
      <img className=" w-full h-40 object-contain rounded-t-base" src={brand.image} alt={brand.name} />
    </a>
    <div className="p-3 text-center">
      <h2 className="text-xl font-semibold">{brand.name}</h2>
    </div>
  </div>

  ))}

   </div>
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
   

      <img
        src={selectedCategory.image}
        alt={selectedCategory.name}
        className="w-3/5 h-64 object-contain"
      />
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

  </>
   
}
