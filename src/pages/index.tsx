import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "@uidotdev/usehooks";
import Button from "@/components/Button";
import Chat from "@/components/Chat";

const inter = Inter({ subsets: ["latin"] });

const dummyMsgs = [
  {
    msg: "hello",
    sender: "seller",
  },
  {
    msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    sender: "student",
  },
  {
    msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.  ",
    sender: "seller",
  }
]

export default function Home() {
  const [data, setData] = useState({
    username:"",
    allMsgs:[
      ...dummyMsgs
  ],
    listing_price:0,
    true_value:0,
    debt:0,
    motivation_level:"",
    isUserNameAvailable:false,
    loadingStates:{
      startBtn : false,
      typing : false,
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
      {/* {debouncedValue} */}
     {data?.disabledStates?.startChat ?
     <div className="z-10 max-w-5xl mx-auto w-full items-center justify-center font-mono text-sm flex flex-col  ">
     <input type="text" placeholder="username" onChange={(e)=>setData({...data,username:e.target.value})} className="border-2 border-black p-2 rounded-md"/>
    {(debouncedValue) && (data?.isUserNameAvailable ?  <p className="text-green-500">username available</p> : <p className="text-red-500">username not available</p>)}
    <Button disabled={data?.disabledStates?.startBtn} loading={data?.loadingStates?.startBtn} handleClick={() => startTest()} >Start Test</Button>
    </div>
    :
    <div className="  w-full sm:flex justify-center items-start relative font-mono text-sm   ">
      <div className="my-4 text-xl font-medium w-full sm:max-w-xs h-fit bg-blue-200 px-4 py-2 rounded-lg mr-5 ">
        <div className="my-2">
        <p>Username: <b> {data?.username}</b></p>

        </div>
      <p>Listing Price: <b>{data?.listing_price}</b></p>
      <p>True Value: <b>{data?.true_value}</b></p>
      {/* <p>Debt: {data?.debt}</p>
      <p>Motivation Level: {data?.motivation_level}</p> */}
      </div>
      <div className="w-full  flex items-center justify-start mt-4">
      <Chat data={data} setData={setData}/></div>


      </div>
    }

     
    </main>
  );
}
