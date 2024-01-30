import axios from 'axios'
import React, { useEffect, useRef } from 'react'
const BouncingDots = () => {
    return (
      <div className="flex justify-center items-center p-1">
        <div className="animate-bounce-fast h-2 w-2 bg-gray-400 rounded-full mr-1"></div>
        <div className="animate-bounce-fast h-2 w-2 bg-gray-300 rounded-full mr-1" style={{ animationDelay: '0.1s' }}></div>
        <div className="animate-bounce-fast h-2 w-2 bg-gray-400 rounded-full" style={{ animationDelay: '0.2s' }}></div>
      </div>
    );
  };
const ChatUI = ({ msg, sender, username,typing=false}:any)=> {
  return (
    <div className={`w-full flex justify-start  ${sender == "seller" ? "flex-row" : " flex-row-reverse"}  items-start gap-x-1`}>
        <div className={`w-8 h-8 ${sender === 'seller' ? 'bg-gray-700' : 'bg-blue-700'} text-white rounded-full uppercase font-bold flex items-center justify-center`}>
        {sender == "seller" ? "S" : username}
            </div> 
      <div className={`w-9/12 ${sender == "seller" ? "bg-gray-200" : "bg-blue-200"} p-2 rounded-md text-black max-w-fit `}>
        {typing ? <BouncingDots /> : msg}
      </div>
    </div>
  )
}

export default function Chat({ data , setData} :any) {
    const ref = useRef<any>(null)
    const [msg,setMsg] = React.useState("")
    const sendMsg = async() => {
        setData((data:any) => ({...data,
            allMsgs:[...data.allMsgs,{msg,sender:"student"}],
            loadingStates:{...data.loadingStates,sendMsg:true, typing:true}}))
        try{
            setMsg("")
            const { data:res } = await axios.post("/reply",{
                id:data.username,
                msg
            })
            console.log("msg sent",res)
            setData((data:any) => ({...data,
                allMsgs:[...data.allMsgs,{msg:res,sender:"seller"}],
                loadingStates:{...data.loadingStates,sendMsg:false,typing:false}}))
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        ref?.current?.scrollIntoView({behavior:"smooth"})
    },[
        data?.allMsgs
    ])
  return (
    <div className='w-full sm:max-w-2xl h-[600px] bg-gray-100 border border-red rounded-md relative'>
        <div className='overflow-y-scroll h-[560px] w-full flex flex-col gap-1 gap-y-4 p-3'>
        {data?.allMsgs?.map((msg:any) => <ChatUI msg={msg.msg} sender={msg.sender} username={data?.username[0]}/>)}
        {data?.loadingStates?.typing && <ChatUI msg="" sender="seller" typing={true}/>}
            <div ref={ref}/>
            </div>
        <div className="flex w-full justify-between items-center absolute bottom-0">
          <input type="text" className="w-full p-2" placeholder="Type a message" value={msg} onChange={(e) => setMsg(e.target.value)} />
          <button className="bg-black text-white p-2 rounded-md" onClick={() => sendMsg()}>Send</button>
        </div>
    </div>
  )
}
