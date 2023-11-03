import { Button, Typography } from '@mui/material/index.js';
import React, { useState } from 'react';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded.js';
import AccountCircleIcon from '@mui/icons-material/AccountCircle.js';
import SendRoundedIcon from '@mui/icons-material/SendRounded.js';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined.js';
import { useDispatch } from 'react-redux';
import { API_ENDPOINTS } from '../../redux/utils/api';
import { POST } from '../utils/Const';
import { callApi } from '../../redux/utils/apiActions';

function Chatbot() {
    const [showChatbot, setShowChatbot] = useState(false);
    const [receiving, setReceiving] = useState(false);
    const dispatch = useDispatch();
    const [chats, setChats] = useState([
        {
            timestamp: new Date(),
            type: "res",
            payload: {
                text: "Hi! How can I help you?",
                link: "",
            }
        },
        // {
        //     timestamp: new Date(),
        //     type: "query",
        //     payload: {
        //         text: "recommend me a property under 3 crore"
        //     }
        // },
    ]);
    const [query, setQuery] = useState("");

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
            setChats((currChats) => [...currChats, queryChat]);
            setQuery("");
            const options = {
                api: API_ENDPOINTS["chat"],
                method: POST,
                headers: { "Content-Type": "application/json" },
                data: {
                    "userQuestion": ques,
                    "history": chats[chats.length - 1]?.payload?.text,
                    "openai_key": "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"
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
                const resChat = {
                    timestamp: new Date(),
                    type: "res",
                    payload: {
                        text: data?.data
                    }
                };
                setChats((currChats) => [...currChats, resChat]);
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

    const renderChatUnit = (payload) => {
        const type = payload?.type;
        switch (type) {
            case "res":
            case "query":
                return (
                    <div className={`chat_item_wrapper ${type === "res" ? "res_item" : "query_item"}`}>
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
                                {payload.payload.link && (
                                    <a href={payload.payload.link} target='_blank' className='unreadable_data'>{payload.payload.link}</a>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case "recv":
                return (
                    <div className={`chat_item_wrapper receiving_wrapper`}>
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
                            chats?.map((chat) => {
                                return renderChatUnit(chat);
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