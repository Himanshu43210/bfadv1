import { Button, Typography } from '@mui/material/index.js';
import React, { useEffect, useRef, useState } from 'react';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded.js';
import AccountCircleIcon from '@mui/icons-material/AccountCircle.js';
import SendRoundedIcon from '@mui/icons-material/SendRounded.js';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined.js';
import { useDispatch, useSelector } from 'react-redux';
import { API_ENDPOINTS } from '../../redux/utils/api';
import { POST } from '../utils/Const';
import { callApi } from '../../redux/utils/apiActions';
import { storeChat } from '../../redux/slice/chatSlice';

function Chatbot() {
    const [showChatbot, setShowChatbot] = useState(false);
    const [receiving, setReceiving] = useState(false);
    const [query, setQuery] = useState("");
    const lastChatRef = useRef();
    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chat);

    useEffect(() => {
        if (chats.length) {
            lastChatRef.current?.scrollIntoView({
                bahavior: "smooth",
                block: "start"
            });
        }
    }, [chats.length]);

    const handleBotBtnClick = () => {
        setShowChatbot(!showChatbot);
    };

    const handleChatInput = (e) => {
        const q = e.target.value;
        setQuery(q);
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        const ques = query.trim();
        if (ques !== "") {
            setReceiving(true);
            const queryChat = {
                timestamp: new Date(),
                type: "query",
                payload: {
                    text: ques
                }
            };
            dispatch(storeChat(queryChat));
            setQuery("");
            const options = {
                api: API_ENDPOINTS["chat"],
                method: POST,
                headers: { "Content-Type": "application/json" },
                data: {
                    "userQuestion": ques,
                    "history": chats[chats.length - 1]?.payload?.text,
                    // "openai_key": keyPart1 + keyPart2 + keyPart3
                }
            };
            fetch('https://itsolutionshub.com/chat', {
                method: "POST",
                headers: options.headers,
                body: JSON.stringify(options.data)
            }).then((res) => {
                return res.json();
            }).then((data) => {
                console.log('++++++ CHATBOT RESPONSE ++++++', data);
                setReceiving(false);
                if (data?.data?.isFilter) {
                    const resChat = {
                        timestamp: new Date(),
                        type: "res",
                        payload: {
                            text: data?.data?.data,
                            links: data?.data?.isFilter ? data?.data?.propertyLinks : null
                        }
                    };
                    dispatch(storeChat(resChat));
                }
            }).catch((error) => {
                console.log('====== CHATBOT ERROR ======', error);
            });
            // dispatch(callApi(options))
            //     .then((res) => {
            //         console.log('++++++ CHAT RES +++++', res, res.payload?.data);
            //         if (res.payload?.data) {

            //         }
            //     }).catch((error) => {
            //         console.log('----- Chat error -----', error);
            //     });
        }
    };

    const formatDateTime = (timestamp, format = "dd mon yyyy") => {
        const date = new Date();
        // if today show the time
        // if yesterday show tomorrow
        const formattedDate = date.toLocaleString('default', {
            hour12: true, hour: "2-digit", minute: "2-digit", day: 'numeric', month: '2-digit', year: "numeric",
        });
        return formattedDate;
    };

    const renderChatUnit = (payload, index) => {
        const type = payload?.type;
        switch (type) {
            case "res":
            case "query":
                return (
                    <div className={`chat_item_wrapper ${type === "res" ? "res_item" : "query_item"}`} ref={index === (chats.length - 1) ? lastChatRef : null}>
                        <div className='chat_item_left'>
                            {
                                type === "res" ? (
                                    <SmartToyRoundedIcon className='sender_img' />
                                ) : (
                                    <AccountCircleIcon className='sender_img' />
                                )
                            }
                        </div>
                        <div className='chat_item_right'>
                            <div className='chat_item_metadata'>
                                <small className='chat_time_data'>{formatDateTime(payload.timestamp)}</small>
                            </div>
                            <div className='chat_item_body'>
                                {payload.payload.text && (
                                    <span>{payload.payload.text}</span>
                                )}
                                {payload.payload.links && (
                                    payload.payload.links?.map((link) => (
                                        <>
                                            <br></br>
                                            <a href={link} target='_blank' className='unreadable_data'>{link}</a>
                                        </>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                );
            case "recv":
                return (
                    <div className={`chat_item_wrapper receiving_wrapper`} ref={index === (chats.length - 1) ? lastChatRef : null}>
                        <div className='chat_item_left'>
                            <SmartToyRoundedIcon className='sender_img' />
                        </div>
                        <div className='chat_item_right'>
                            <div className='chat_item_body'>
                                <span>Wait...</span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderInputUnit = () => {
        return (
            <form className='chat_form' onSubmit={(e) => handleChatSubmit(e)}>
                <textarea value={query} name="chat_input" id="chat_input" className='chat_input' rows="1" onInput={(e) => handleChatInput(e)} placeholder='Write Your query ...' required></textarea>
                <Button type='submit' className='chat_submit_btn'>
                    <SendRoundedIcon className='send_icon' />
                </Button>
            </form>
        );
    };

    return (
        <div className='chatbot_component'>
            <Button className='bot_btn' onClick={handleBotBtnClick}>
                {
                    !showChatbot ? (
                        <SmartToyRoundedIcon className='bot_icon' />
                    ) : (
                        <CloseOutlinedIcon className='chatbot_close' />
                    )
                }
            </Button>
            {showChatbot && (
                <div className='chatbot_wrapper'>
                    <div className='section_header'>
                        <div className='header_left'>
                            <SmartToyRoundedIcon className='header_icon' />
                            <Typography variant="h3" className="detailcardheading header_title">BuilderFloor Chat</Typography>
                        </div>
                        <div className='header_right'>
                            <Button className='bot_btn' onClick={handleBotBtnClick}>
                                <CloseOutlinedIcon className='chatbot_close' />
                            </Button>
                        </div>
                    </div>
                    <div className='chats_wrapper'>
                        {
                            chats?.map((chat, index) => {
                                return renderChatUnit(chat, index);
                            })
                        }
                        {receiving && renderChatUnit({ type: "recv" })}
                    </div>
                    <div className='section_footer'>
                        {renderInputUnit()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot;