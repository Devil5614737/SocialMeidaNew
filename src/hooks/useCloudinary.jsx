import { useEffect, useState } from "react"

export const useCloudinary=(file)=>{
const[url,setUrl]=useState("");
const[error,setError]=useState("");
const[loading,setLoading]=useState(false)



const postData = async () => {
  setLoading(true)
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "tzo42pxi");
    data.append("cloud_name", "dwtpwuwax");
    fetch("https://api.cloudinary.com/v1_1/dwtpwuwax/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setUrl(data.url)
      })
      .catch((err) => {
        setLoading(false)
        setError(err);
      });
  };




useEffect(()=>{
  if(file){
    postData()
  }
},[file])


return {url,error,loading}
}