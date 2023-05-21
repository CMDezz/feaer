import React, { useEffect, useState, useRef } from "react";
import { Drawer, Space, Input, Button, Row, Col } from "antd";
import "./Styles/index.scss";
import {Link} from 'react-router-dom'
function DrawerMessage(props) {
  const { onClose, open } = props;
  const [socket, setSocket] = useState(null);
  const ENDPOINT = "127.0.0.1:8000";
  const [message, setMessage] = useState("");
  const [allChatData, setAllChatData] = useState({ chatContent: [] });
  const [constAllChatData, setConstAllChatData] = useState({});
  const messageRef = useRef([]);
  const adminId = "64648cfdb99f6f1d5d67759f";
  const [infoUser, setInfoUser] = useState({});
  const [currentThread, setCurrentThread] = useState({});
  const baseUrl = process.env.REACT_APP_CHAT_URL;

  useEffect(() => {
    if (open && socket == null) {
      let storage = JSON.parse(localStorage.getItem("feaer_login_info")) || {};
      if (storage.Token) {
        //get threads id  //confict
        fetch(baseUrl + '?id='+storage.User._id)
        .then(res=>res.json())
        .then(res=>{
          console.log('res ne',res)
          setCurrentThread(res[0])
          return res[0]
        })
        .then((res)=>{
          console.log('res ne 2 ',res)
          //connecto to a thread
          let socket = new WebSocket(
            "ws://" + ENDPOINT + "/ws/chat/" + res.sessionId + "/"
          );
          setSocket(socket);
          setInfoUser(storage)
        })
        .catch(err=>{
          console.log('err',err)})
        // })


        // let socket = new WebSocket(
        //   "ws://" + ENDPOINT + "/ws/chat/" + "64648e225ce04e256e225d2d" + "/"
        // );
        // setSocket(socket);
        // setInfoUser(storage)
      }else{
        setInfoUser({})
      }
      console.log('sotrag ',storage)
      
    }
  }, [open]);

  useEffect(() => {
    console.log('2')
    if (socket != null) {
      console.log('1')
      socket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log("data frojm asdasdasdasd socket ", data);
        setDuLieu(data);
      };

      socket.onclose = function (e) {};
      setSocket(socket);
    }
  }, [socket, allChatData.chatContent.length]);

  const sendMessage = () => {
    console.log("text ne ", message);
    if (message === "") {
      return;
    }
    let _data = {
      message: message,
      // sent_by: infoUser.User?._id,
      // send_to: adminId,
      // thread_id: currentThread.sessionId, //confict
      sent_by: infoUser.User._id,
      send_to: adminId,
      thread_id: currentThread.sessionId,
    };
    socket && socket.send(JSON.stringify(_data));
    setMessage("");
  };
  const sortDateChat = { ...allChatData };
  const setDuLieu = (data) => {
    let _modeldata = {
      sessionId: data.thread_id, //tên phòng,
      userInfo: data.userInfo, //
      chatName: data.chatName,
      time: data.time, //ngày update,
      chatContent: [
        ...allChatData.chatContent,
        { fromAdmin: data["sent_by"] == adminId, text: data.message },
      ],
    };

    console.log("_modeldata ne ", _modeldata);
    console.log("allChatData ne ", allChatData);
    setAllChatData({ ..._modeldata });
    // setConstAllChatData([...cloneData]);
    if (messageRef && messageRef.current) {
      // console.log('messageRef?.current', messageRef.current.scrollIntoView)
      //   messageRef?.current?.scrollIntoView({ behavior: "smooth",block:'end' })
    }
  };

  const [openTimeTooltip, setOpenTimeTooltip] = useState("");

  return (
    <Drawer
      title="Hỗ trợ trực tuyến"
      placement={"right"}
      closable={false}
      onClose={onClose}
      open={open}
      key={"right"}
    >
        {console.log('infoUser ',infoUser)}
        {
            !infoUser.Token?
                <a href='/signin'>Bấm vào đây để chuyển đến trang đăng nhập</a>
            :
      <div className="wrapperMessageClient">
        <div className="ChatContent">
          <div className="boxchat-contents">
            {/* {window.innerWidth > 700 && ( */}
              <div className="flex-col chat-box-list">
                {sortDateChat.chatContent.map((item, index) => {
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
                    </div>
                  );
                })}
              </div>
            {/* )} */}
          </div>
        </div>
        <div className="chatActions mt-2">
          <Row
            direction="horizontal"
            style={{ width: "100%", margin: 0 }}
            gutter={[16, 16]}
          >
            <Col style={{ flex: 1 }}>
              <Input
                onPressEnter={sendMessage}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hãy nhập gì đó."
                classNames={"heheh"}
              />
            </Col>
            <Col>
              <Button style={{ width: 80 }} onClick={sendMessage}>
                Gửi
              </Button>
            </Col>
          </Row>
        </div>
      </div>
        }
    </Drawer>
  );
}

export default DrawerMessage;
