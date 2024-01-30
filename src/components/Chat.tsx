import axios from 'axios'
import React, { useEffect, useRef } from 'react'

const ChatUI = ({ msg, sender}:any)=> {
  return (
    <div className={`w-full flex ${sender == "seller" ? "justify-start" : "justify-end"}  items-center`}>
      <div className={`w-9/12 ${sender == "seller" ? "bg-gray-200" : "bg-blue-200"} p-2 rounded-md text-black max-w-fit `}>
        {msg}
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
            loadingStates:{...data.loadingStates,sendMsg:true}}))
        try{
            setMsg("")
            const { data:res } = await axios.post("/reply",{
                id:data.username,
                msg
            })
            console.log("msg sent",res)
            setData((data:any) => ({...data,
                allMsgs:[...data.allMsgs,{msg:res,sender:"seller"}],
                loadingStates:{...data.loadingStates,sendMsg:false}}))
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
    <div className='w-full sm:max-w-sm h-96 bg-gray-100 border border-red rounded-md relative'>
        <div className='overflow-y-scroll h-[350px] w-full flex flex-col gap-1 p-1'>
        {data?.allMsgs?.map((msg:any) => <ChatUI msg={msg.msg} sender={msg.sender}/>)}
            <div ref={ref}/>
            </div>
        <div className="flex w-full justify-between items-center absolute bottom-0">
          <input type="text" className="w-full p-2" placeholder="Type a message" value={msg} onChange={(e) => setMsg(e.target.value)} />
          <button className="bg-black text-white p-2 rounded-md" onClick={() => sendMsg()}>Send</button>
          </div>
    </div>
  )
}
