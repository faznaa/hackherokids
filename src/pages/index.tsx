import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "@uidotdev/usehooks";
import Button from "@/components/Button";
import Chat from "@/components/Chat";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState({
    username:"",
    allMsgs:[

  ],
    listing_price:0,
    true_value:0,
    debt:0,
    motivation_level:"",
    isUserNameAvailable:false,
    loadingStates:{
      startBtn : false
    },
    disabledStates:{
      startBtn : true,
      startChat : true
    },
  });
  const debouncedValue = useDebounce(data?.username,500);

  useEffect(() => {
    const checkIfUserNameAvailable = async () => {
      const { data:res } = await axios.post("/username_available",{
        id:data.username
      })
      console.log("username available",res)
      setData({...data,isUserNameAvailable:res,disabledStates:{...data.disabledStates,startBtn:!res}})
    } 
    if(data.username){
      checkIfUserNameAvailable()
    }else {
      setData({...data,disabledStates:{...data.disabledStates,startBtn:true}})
    }
  },[debouncedValue])
 
  const startTest = async () => {

   try{
    setData({...data,loadingStates:{...data.loadingStates,startBtn:false}})
    const {data : res} = await axios.post("/create_user",{
      id:data.username
    })
    console.log("user created",res)
    setData((data:any) => ({...data,listing_price:res.listing_price,true_value:res.true_value,debt:res.debt,motivation_level:res.motivation_level, disabledStates:{...data.disabledStates,startChat:false}}))
   }catch(err){
      console.log(err)
   }finally{
      setData((data:any) => ({...data,loadingStates:{...data.loadingStates,startBtn:false}}))
   }
  }
  useEffect(() => {
    console.log("data",data)
    console.log("debouncedValue",debouncedValue)
  }, [data]);
 
  return (
    <main
      className={`bg-white text-black flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
     {data?.disabledStates?.startChat ?
     <div className="z-10 max-w-5xl w-full items-start justify-start font-mono text-sm flex flex-col  ">
     <input type="text" placeholder="username" onChange={(e)=>setData({...data,username:e.target.value})} className="border-2 border-black p-2 rounded-md"/>
    {(debouncedValue) && (data?.isUserNameAvailable ?  <p className="text-green-500">username available</p> : <p className="text-red-500">username not available</p>)}
    <Button disabled={data?.disabledStates?.startBtn} loading={data?.loadingStates?.startBtn} handleClick={() => startTest()} >Start Test</Button>
    </div>
    :
    <div className=" max-w-5xl w-full items-start justify-start font-mono text-sm flex flex-col  ">
      <p>Listing Price: {data?.listing_price}</p>
      <p>True Value: {data?.true_value}</p>
      <p>Debt: {data?.debt}</p>
      <p>Motivation Level: {data?.motivation_level}</p>
      <p>Username {data?.username}</p>
<Chat data={data} setData={setData}/>

      </div>
    }

     
    </main>
  );
}
