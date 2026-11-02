import { HashLoader } from "react-spinners";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#0aad0a",
};
export default function Loading() {
  const color = "#0aad0a";

  return <>
    <div className="sweet-loading py-10">
   

      <HashLoader
        color={color}
        
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>  
    </>
   
}
