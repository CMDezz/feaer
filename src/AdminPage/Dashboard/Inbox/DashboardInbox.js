import React, { useCallback, useRef } from "react";
import "./../../Styles/App.scss";
import "./../../Styles/Dashboard.scss";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ENDPOINT = "127.0.0.1:8000";
const adminId = '6448aa754a3d5e97f2f37df7'
const userId = '6448aa7d48d7d1de445c9f84'
const threadId = "644a21811f84cffcf5de1743"
export default function DashboardInbox(props) {
  const [allChatData, setAllChatData] = useState([]);
  const [constAllChatData, setConstAllChatData] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const [roomIndex, setRoomIndex] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [dataState, setDataState] = useState([]);
  // const baseApiUrl = process.env.REACT_APP_CHAT_URL;
  // const socket = socketIOClient(ENDPOINT);
  let chatSocket;

  const roomName = "roomm";

  useEffect(() => {
    if (roomId) {
      console.log('connected to room  ',roomId)
      const chatSocket = new WebSocket(
        "ws://" + ENDPOINT + "/ws/chat/" + roomId + "/"
      );

      setSocket(chatSocket);
    }
    return () => {
      socket && socket.close();
    };
  }, [roomId]);

  useEffect(()=>{
    let url = 'http://127.0.0.1:8000/chat?id=6448aa754a3d5e97f2f37df7'
    console.log('REACT_APP_CHAT_URL ',url)
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
      console.log('res ne',res)
      if (Boolean(res.length)) setRoomId(res[0].sessionId)
      setAllChatData(res)
      setConstAllChatData(res)
    }).catch(err=>console.log('err ',err))

    return ()=>{
      setRoomId(0)
    }
  },[])

  useEffect(() => {
    if (roomId && socket) {
      console.log('er')
        socket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            setDuLieu(data);
            // document.querySelector('#chat-log').value += (data.message + '\n');
          };
      
          socket.onclose = function (e) {};
          setSocket(socket);
    }

  }, [socket]);
  const setDuLieu = (data) => {
      console.log('sert du lieu ne ',data)
      let _modeldata = {
        sessionId: data.thread_id, //tên phòng,
        userInfo: {}, //
        chatName: "",
        time: undefined, //ngày update,
        chatContent: [{ fromAdmin: data['sent_by'] == adminId , text: data.message }],
      };
      // setAllChatData([...allChatData,_modeldata])
      // setConstAllChatData([...allChatData,_modeldata])
      let index = allChatData.findIndex(
        (chat) => chat.sessionId == data.thread_id
      );
        console.log('allChatData ',allChatData)
        console.log('index ',index)
      if (index > -1) {
        let cloneData = [...allChatData];
        cloneData[index].chatContent = [
          ...cloneData[index].chatContent,
          { text: data.message,fromAdmin: data['sent_by'] == adminId },
        ];
        console.log("cloneData ne ", cloneData);
        setAllChatData([...cloneData]);
        setConstAllChatData([...cloneData]);
      } else {
        setAllChatData([...allChatData, _modeldata]);
        setConstAllChatData([...constAllChatData, _modeldata]);
      }
    }



  // useEffect(() => {
  //     socket.emit('join', {
  //         sessionId: 'admin',
  //         isAdmin: true
  //     })
  //     socket.on('send-all-chat', (data) => {
  //         setAllChatData(data)
  //         setConstAllChatData(data)
  //         if (window.innerWidth > 700) {
  //             if (data.length > 0) {
  //                 setRoomId(data[0].sessionId)
  //                 if (messageRef.current) messageRef.current.scrollIntoView({ behavior: "smooth" })
  //             }
  //         }
  //     })
  //     socket.on("client-msg", function (data) {
  //         setAllChatData(data.allchat)
  //         setConstAllChatData(data.allchat)
  //         if (messageRef.current) messageRef.current.scrollIntoView({ behavior: "smooth" })
  //     })
  //     if (window.innerWidth <= 700) {
  //         setRoomIndex(null)
  //     }
  // }, [])

  const handleOnChange = (event) => {
    setChatInput(event.target.value);
  };

  const sendChatInput = (event) => {
    event.preventDefault();
    console.log('gui mess ',chatInput)
    if (chatInput === "") {
      return;
    }
    // const data = {
    //     fromAdmin: true,
    //     text: chatInput,
    //     time: new Date(),
    //     roomId: roomId
    // }
    // socket.emit('messageSend-admin', data)
    // setTimeout(() => {
    //     axios.get(`http://localhost:4000/chat`)
    //         .then(res => {
    //             setAllChatData(res.data)
    //             setConstAllChatData(res.data)
    //             setChatInput("")
    //             if (messageRef.current) messageRef.current.scrollIntoView({ behavior: "smooth" })
    //         }
    //         )
    // }, 100)
    socket && socket.send(
      JSON.stringify({
        message: chatInput,
        sent_by: adminId,
        send_to: userId,
        thread_id:threadId ,
      })
    );
    setChatInput('')
  };

  const messageRef = useRef([]);

  const filterOnSearch = (value) => {
    const search = [];
    for (let i in constAllChatData) {
      if (constAllChatData[i].chatName.toLowerCase().includes(value)) {
        search.push(constAllChatData[i]);
      }
    }
    setAllChatData(search);
  };

  const sortDateChat = [...allChatData];
  // if (allChatData.length > 0) {

  //     sortDateChat.sort((a,b) => {
  //         var dateA = new Date(a.chatContent[a.chatContent.length - 1].time)
  //         var dateB = new Date(b.chatContent[b.chatContent.length - 1].time)
  //         return dateB - dateA
  //     })
  // }

  const [openTimeTooltip, setOpenTimeTooltip] = useState("");

  return (
    <div className="boxchat-admin flex">
      <div className="boxchat-left">
        <div className="boxchat-search">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
              filterOnSearch(event.target.value);
            }}
          ></input>
        </div>
        <div className="boxchat-list">
          {sortDateChat.length > 0 &&
            sortDateChat.map((item, index) => {
              const date = item.chatContent[item.chatContent.length - 1] ? new Date(
                item.chatContent[item.chatContent.length - 1].time
              ):new Date();
              const toDay = new Date();
              const day = date.getDay();
              const dayInMonth = date.getDate();
              const month = date.getMonth() + 1;
              const hour = date.getHours();
              const minute = date.getMinutes();
              var strTime = "";
              if (dayInMonth === toDay.getDate()) {
                if (hour < 10) {
                  strTime += `- 0${hour}`;
                } else {
                  strTime += `- ${hour}`;
                }
                if (minute < 10) {
                  strTime += `:0${minute}`;
                } else {
                  strTime += `:${minute}`;
                }
              }
              if (dayInMonth < toDay.getDate()) {
                strTime = `- T${day}`;
              }
              if (toDay.getDate() - dayInMonth > 6) {
                strTime = "";
                if (dayInMonth < 10) {
                  strTime += `- 0${dayInMonth}`;
                } else {
                  strTime += `- ${dayInMonth}`;
                }
                if (month < 10) {
                  strTime += `/0${month}`;
                } else {
                  strTime += `/${month}`;
                }
              }
              return (
                <div
                  key={index}
                  className={
                    roomIndex === index
                      ? "boxchat-item flex boxchat-item-active"
                      : "boxchat-item flex"
                  }
                  onClick={() => {
                    setRoomId(item.sessionId);
                    setRoomIndex(index);
                    console.log('clcikckckc ',item)
                    // setTimeout(() => {
                    //   if (messageRef.current)
                    //     messageRef.current.scrollIntoView({
                    //       behavior: "smooth",
                    //     });
                    // }, 10);
                  }}
                >
                  <div
                    className="boxchat-avt flex-center"
                    style={{ pointerEvents: "none" }}
                  >
                    {item.userInfo && (
                      <img src={item.userInfo.userAvt} alt=""></img>
                    )}
                    {!item.userInfo && (
                      <img
                        src={
                          "http://localhost:4000/images/16f9bbf512b66a228f7978e34d8fb163.jpeg"
                        }
                        alt=""
                      ></img>
                    )}
                  </div>
                  <div
                    className="flex-col"
                    style={{
                      pointerEvents: "none",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="boxchat-name">{item.chatName}</p>
                    {
                      Boolean(item.chatContent.length )&& 
                      <div className="boxchat-first flex">
                      {item.chatContent[item.chatContent.length - 1]
                        .fromAdmin === true && (
                        <p>
                          Bạn:{" "}
                          {item.chatContent[item.chatContent.length - 1].text}
                        </p>
                      )}
                      {!item.chatContent[item.chatContent.length - 1]
                        .fromAdmin && (
                        <p>
                          {item.chatContent[item.chatContent.length - 1].text}
                        </p>
                      )}
                      <p>{strTime}</p>
                    </div>
                    }
                    
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {typeof roomIndex === "number" && window.innerWidth <= 700 && (
        <div className="boxchat-mobile flex">
          <div className="boxchat-mobile-header flex">
            <div
              className="boxchat-mobile-header-leave"
              onClick={() => {
                setRoomIndex(null);
              }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ pointerEvents: "none" }}
              />
            </div>
            {sortDateChat.length > 0 && (
              <div className="boxchat-box-info">
                <div className="boxchat-box-avt flex-center">
                  {sortDateChat[Number(roomIndex)].userInfo && (
                    <img
                      src={sortDateChat[Number(roomIndex)].userInfo.userAvt}
                      alt=""
                    ></img>
                  )}
                  {!sortDateChat[Number(roomIndex)].userInfo && (
                    <img
                      src={
                        "http://localhost:4000/images/16f9bbf512b66a228f7978e34d8fb163.jpeg"
                      }
                      alt=""
                    ></img>
                  )}
                </div>
                <div className="flex-center">
                  {sortDateChat[Number(roomIndex)].userInfo && (
                    <p className="boxchat-name">
                      {allChatData[Number(roomIndex)].chatName}
                    </p>
                  )}
                  {!sortDateChat[Number(roomIndex)].userInfo && (
                    <div className="flex" style={{ alignItems: "flex-end" }}>
                      <p className="boxchat-name">
                        {allChatData[Number(roomIndex)].chatName}
                      </p>
                      <p
                        style={{
                          marginLeft: "5px",
                          color: "#777",
                          fontSize: "16px",
                          fontFamily: "sans-serif",
                        }}
                      >
                        (anonymous)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="boxchat-mobile-main">
            <div className="boxchat-contents">
              {sortDateChat.length > 0 && (
                <div className="flex-col chat-box-list">
                  {sortDateChat[roomIndex].chatContent.map((item, index) => {
                    const date = new Date(item.time);
                    const toDay = new Date();
                    const day = date.getDay();
                    const dayInMonth = date.getDate();
                    const month = date.getMonth() + 1;
                    const hour = date.getHours();
                    const minute = date.getMinutes();
                    let chatTime = "";
                    if (dayInMonth === toDay.getDate()) {
                      if (hour < 10) {
                        chatTime += `0${hour}`;
                      } else {
                        chatTime += `${hour}`;
                      }
                      if (minute < 10) {
                        chatTime += `:0${minute}`;
                      } else {
                        chatTime += `:${minute}`;
                      }
                    }
                    if (dayInMonth < toDay.getDate()) {
                      chatTime = `T${day}`;
                    }
                    if (toDay.getDate() - dayInMonth > 6) {
                      chatTime = "";
                      if (dayInMonth < 10) {
                        chatTime += `0${dayInMonth}`;
                      } else {
                        chatTime += `${dayInMonth}`;
                      }
                      if (month < 10) {
                        chatTime += `/0${month}`;
                      } else {
                        chatTime += `/${month}`;
                      }
                    }
                    return (
                      <div ref={messageRef} key={index} className="chat-list">
                        {item.fromAdmin !== true && (
                          <div
                            className="box-chat-clienttext"
                            onMouseEnter={() => {
                              setOpenTimeTooltip(item.time);
                            }}
                            onMouseLeave={() => {
                              setOpenTimeTooltip("");
                            }}
                          >
                            <p>{item.text}</p>
                            {openTimeTooltip === item.time && (
                              <div className="time-tooltip-client flex-center">
                                <p>{chatTime}</p>
                              </div>
                            )}
                          </div>
                        )}
                        {item.fromAdmin === true && (
                          <div
                            className="box-chat-admintext"
                            onMouseEnter={() => {
                              setOpenTimeTooltip(item.time);
                            }}
                            onMouseLeave={() => {
                              setOpenTimeTooltip("");
                            }}
                          >
                            <p style={{ pointerEvents: "none" }}>{item.text}</p>
                            {openTimeTooltip === item.time && (
                              <div className="time-tooltip flex-center">
                                <p>{chatTime}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="boxchat-type boxchat-mobile-type">
            <form onSubmit={sendChatInput} className="boxchat-type-form">
              <input
                type="text"
                onChange={handleOnChange}
                value={chatInput}
                placeholder="Type your message..."
              ></input>
              <button>Send</button>
            </form>
          </div>
        </div>
      )}
      <div className="boxchat-main">
        <div className="boxchat-box">
          {sortDateChat.length > 0 && (
            <div className="boxchat-box-info">
              <div className="boxchat-box-avt flex-center">
                {sortDateChat[Number(roomIndex)].userInfo && (
                  <img
                    src={sortDateChat[Number(roomIndex)].userInfo.userAvt}
                    alt=""
                  ></img>
                )}
                {!sortDateChat[Number(roomIndex)].userInfo && (
                  <img
                    src={
                      "http://localhost:4000/images/16f9bbf512b66a228f7978e34d8fb163.jpeg"
                    }
                    alt=""
                  ></img>
                )}
              </div>
              <div className="flex-center">
                {sortDateChat[Number(roomIndex)].userInfo && (
                  <p className="boxchat-name">
                    {allChatData[Number(roomIndex)].chatName}
                  </p>
                )}
                {!sortDateChat[Number(roomIndex)].userInfo && (
                  <div className="flex" style={{ alignItems: "flex-end" }}>
                    <p className="boxchat-name">
                      {allChatData[Number(roomIndex)].chatName}
                    </p>
                    <p
                      style={{
                        marginLeft: "5px",
                        color: "#777",
                        fontSize: "16px",
                        fontFamily: "sans-serif",
                      }}
                    >
                      (anonymous)
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="boxchat-contents">
            {sortDateChat.length > 0 && window.innerWidth > 700 && (
              <div className="flex-col chat-box-list">
                {sortDateChat[roomIndex].chatContent.map((item, index) => {
                  const date = new Date(item.time);
                  const toDay = new Date();
                  const day = date.getDay();
                  const dayInMonth = date.getDate();
                  const month = date.getMonth() + 1;
                  const hour = date.getHours();
                  const minute = date.getMinutes();
                  let chatTime = "";
                  if (dayInMonth === toDay.getDate()) {
                    if (hour < 10) {
                      chatTime += `0${hour}`;
                    } else {
                      chatTime += `${hour}`;
                    }
                    if (minute < 10) {
                      chatTime += `:0${minute}`;
                    } else {
                      chatTime += `:${minute}`;
                    }
                  }
                  if (dayInMonth < toDay.getDate()) {
                    chatTime = `T${day}`;
                  }
                  if (toDay.getDate() - dayInMonth > 6) {
                    chatTime = "";
                    if (dayInMonth < 10) {
                      chatTime += `0${dayInMonth}`;
                    } else {
                      chatTime += `${dayInMonth}`;
                    }
                    if (month < 10) {
                      chatTime += `/0${month}`;
                    } else {
                      chatTime += `/${month}`;
                    }
                  }
                  return (
                    <div ref={messageRef} key={index} className="chat-list">
                      {item.fromAdmin !== true && (
                        <div
                          className="box-chat-clienttext"
                          onMouseEnter={() => {
                            setOpenTimeTooltip(item.time);
                          }}
                          onMouseLeave={() => {
                            setOpenTimeTooltip("");
                          }}
                        >
                          <p>{item.text}</p>
                          {openTimeTooltip === item.time && (
                            <div className="time-tooltip-client flex-center">
                              <p>{chatTime}</p>
                            </div>
                          )}
                        </div>
                      )}
                      {item.fromAdmin === true && (
                        <div
                          className="box-chat-admintext"
                          onMouseEnter={() => {
                            setOpenTimeTooltip(item.time);
                          }}
                          onMouseLeave={() => {
                            setOpenTimeTooltip("");
                          }}
                        >
                          <p style={{ pointerEvents: "none" }}>{item.text}</p>
                          {openTimeTooltip === item.time && (
                            <div className="time-tooltip flex-center">
                              <p>{chatTime}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="boxchat-type">
          <form onSubmit={sendChatInput} className="boxchat-type-form">
            <input
              type="text"
              onChange={handleOnChange}
              value={chatInput}
              placeholder="Type your message..."
            ></input>
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
