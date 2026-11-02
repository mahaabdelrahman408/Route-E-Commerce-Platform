import { useEffect, useState } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import axios from "axios";

  export default function CategoriesContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [supcategories, setSupCategories] = useState([]);
  const [supcategoriesoncategory , setSupCategoriesOnCategory] = useState([]);
    //******************* Get All Categories *******************
      useEffect(() => {
    async function getAllCategories() {
      try { const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
        // params: {
        //   page: 1,
        //   limit: 10,
        //   keyword: "Books",
        // }
      );
      setCategories(data.data);
      // console.log("All Categories:", data.data);
    } catch (err) {
      console.error(err);
    } 
    }

    getAllCategories();
  }, [])
      //******************* Get All SubCategories *******************
      useEffect(()=>{

    
    async function getAllSubcategories() {
      
      try{ 
        const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`);

    
      setSupCategories(data.data)
            //  console.log("All Subcategories:", data.data);

        }catch(err){
         console.log("Subcategories",err);
         
      }
    }
    getAllSubcategories();
      },[])

        //******************* Get All SubCategories On Category *******************
 useEffect(()=>{

    
    async function getSubCategories(categoryId) {
      
      try{ 
        const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);

    
      setSupCategoriesOnCategory(data.data)
            //  console.log("All Subcategories On Category :", data.data);

        }catch(err){
         console.log("Subcategories On Category",err);
         
      }
    }
    getSubCategories();
      },[])
  return (
    <CategoriesContext.Provider value={{ categories, setCategories ,supcategories,setSupCategories ,supcategoriesoncategory, setSupCategoriesOnCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
}
