import { useRef,useState } from "react";
import { useChatStore } from "../store/useChatStore.js";

const MessageInput = () => {
  const{text,setText}=useState("");
  const[imagePreview,setImagePreview]=useState(null);
  const fileInoutRef=useRef(null);

  const {sendMessage} = useChatStore();


  const handleImageChange= (e) => {};

  const removeImage=()=>{};

  const handleSendMessage=async(e)=>{};


  


  return (
    <div>
      messageinput
    </div>
  )
}

export default MessageInput
