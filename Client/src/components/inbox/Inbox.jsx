import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../store/AuthContext";
import html2canvas from 'html2canvas';
import storyImage from '../../assets/images/storieimage.png'

const Inbox = () => {
  const [viewMsg, setViewMsg] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const navigate = useNavigate();
  const { user, setUser,setLoading, loading, setExplosion } = useContext(AuthContext);

  const messages = user.message;
  const count = messages.length;
  const handleViewMessage = (msg) => {
    setSelectedMsg(msg);
    setViewMsg(true);
  };

  const handleLogout = async () => {
    setLoading(true);

    localStorage.removeItem("token");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    setUser(null);
    navigate("/signin");
    toast.success("Logged Out");

  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(user.link);
    toast.success("Link Copied");
    setExplosion(true);
  };

  const handleShare = () => {
    const modal = document.querySelector('.share-msg');
    html2canvas(modal).then(canvas => {
      canvas.toBlob(blob => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {

          toast.success("Screenshot copied to clipboard");
          if (navigator.share) {
            navigator.share({
              title: 'Shared Message',
              text: 'Check out this message',
              files: [new File([blob], 'screenshot.png', { type: 'image/png' })],
            });
          } else {
            toast.error("Sharing is not supported in your browser");
          }
        }).catch(err => {
          toast.error("Failed to copy screenshot to clipboard");
        });
      });
    });
  };

  const shareToStory = async () => {
    try {
      if (!navigator.clipboard || !window.ClipboardItem) {
        toast.error("Clipboard API not supported in your browser");
        return;
      }
  

      const response = await fetch(storyImage);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
  

      console.log('Blob:', blob);
  
      const item = new ClipboardItem({ "image/png": blob });
  

      await navigator.clipboard.write([item]);
      toast.success("Screenshot copied to clipboard");
  
   
      if (navigator.share) {

        const file = new File([blob], 'screenshot.png', { type: 'image/png' });
  
        await navigator.share({
          title: 'Shared Message',
          text: 'Check out this message',
          files: [file],
        });
      } else {
        toast.error("Sharing is not supported in your browser");
      }
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      toast.error("Failed to copy screenshot to clipboard");
    }
  };
  

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <div className="flex justify-center">
      <button
              onClick={shareToStory}
              className="bg-red-500 transition duration-500 hover:bg-slate-500 text-white xs:text-[20px] text-[30px] py-2 px-4 rounded-full mt-4 text-center"
            >
              Share to your story <i className="fa-solid fa-share"></i>
            </button>
      </div>
      <div className="flex flex-col items-center justify-center mt-12 ">
        <div className="bg-slate-300 w-[90%] max-w-[800px] shadow-xl h-[80vh] rounded-lg overflow-hidden relative">
          <div className="sticky top-0 bg-gradient-to-b from-blue-300 to-black shadow-lg flex  items-center h-[100px] rounded-t-lg z-10 justify-between p-5">
            <button
              onClick={handleCopyLink}
              className="shadow-lg bg-gradient-to-b from-pink-500 to-red-400 hover:from-red-900 hover:to-pink-600 text-white text-[11px] xs:py-2 xs:px-2 lg:text-[15px] h-10 lg:py-2 lg:px-4 rounded-full"
            >
              {" "}
              <i className="fa-solid fa-copy"></i> Copy Link
            </button>
            <h1 className="lg:text-3xl text-white">
              Inbox{" "}
              <span className="text-sm bg-red-600 text-white p-1 rounded-lg">
                {count}
              </span>
            </h1>
            <button
              onClick={handleLogout}
              className="bg-black transition  hover:bg-slate-500 text-white xs:text-[11px] text-[15px] h-10 py-2 px-4 rounded-full shadow-lg "
            >
               <span className="pr-2">Logout</span>  <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
          <div className="overflow-y-scroll h-[calc(80vh-100px)] p-4">
            <div className="min-h-[500px] flex flex-col items-center justify-start">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full max-w-[90%] bg-slate-100 m-2 p-4 rounded-lg shadow-lg"
                >
                  <div className="max-w-full overflow-hidden text-wrap">
                    <p className="p-2">{msg}</p>
                  </div>
                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      onClick={() => handleViewMessage(msg)}
                      className="bg-gray-900 hover:bg-slate-500 text-white text-[12px] h-10 py-2 px-4 rounded-lg"
                    >
                      <i className="fa-solid fa-eye"></i> View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
       
      </div>
    
      
      {viewMsg && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
    <div className="bg-slate-600 p-3 rounded-lg w-[90%] max-w-[600px] overflow-y-auto max-h-[80vh] relative">
      <div
        onClick={() => setViewMsg(null)}
        className="fixed top-4 right-4 cursor-pointer "
      >
        <i className="text-2xl text-white fa-solid fa-close"></i>
      </div>
      <div className="share-msg">
      <div className="sticky top-0 bg-gradient-to-b from-pink-500 to-cyan-400 shadow-lg flex justify-center items-center h-[100px] rounded-t-lg z-10">
            <h1 className="lg:text-3xl sm:text-xl text-white">send me anonymous message</h1>
          </div>
      <div className=" flex flex-col rounded-md items-center justify-center bg-white max-w-[600px] p-4
      mb-5">
      <p className="lg:text-lg text-md font-bold mb-4 text-center pb-5 break-words">
        {selectedMsg}
      </p>
      </div>
      </div>
    
    
      <div className="flex gap-2 justify-center">
        <button 
          onClick={handleShare}
          className="bg-gradient-to-b from-pink-500 to-red-400 hover:from-red-900 hover:to-pink-600 text-white text-[12px] h-10 py-2 px-4 rounded-lg">
          <i className="fa-solid fa-share"></i> Share 
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Inbox;
