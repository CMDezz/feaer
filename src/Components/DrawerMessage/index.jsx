import React, { useEffect, useState, useRef } from "react";
import { Drawer, Space, Input, Button, Row, Col } from "antd";
import "./Styles/index.scss";
function DrawerMessage(props) {
  const { onClose, open } = props;
  const [socket, setSocket] = useState(null);
  const ENDPOINT = "127.0.0.1:8000";
  const [message, setMessage] = useState("");
  const [allChatData, setAllChatData] = useState({ chatContent: [] });
  const [constAllChatData, setConstAllChatData] = useState({});
  const messageRef = useRef([]);
  const adminId = "6448aa754a3d5e97f2f37df7";

  useEffect(() => {
    if (open && socket == null) {
      let socket = new WebSocket(
        "ws://" + ENDPOINT + "/ws/chat/" + "644b475d9d4c9df98487b57b" + "/"
      );

      setSocket(socket);
    }
  }, [open]);

  useEffect(() => {
    if (socket != null) {
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
      sent_by: "644b453fd7d5cf8cefe520f5",
      send_to: "6448aa754a3d5e97f2f37df7",
      thread_id: "644b475d9d4c9df98487b57b",
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
      <div className="wrapperMessageClient">
        <div className="ChatContent">
          <div className="boxchat-contents">
            {window.innerWidth > 700 && (
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
            )}
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
    </Drawer>
  );
}

export default DrawerMessage;
