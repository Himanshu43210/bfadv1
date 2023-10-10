import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

function Chatbot() {
    const [showChatbot, setShowChatbot] = useState(false);
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
        // {
        //     timestamp: new Date(),
        //     type: "res",
        //     payload: {
        //         text: "Here's a recommended property under 3 crore.",
        //         link: "https://builderfloor.com/builderFloorDetails?title=Ultra-Luxury-Builder-Floor-in-Gurgaon&id=651eb08e2b36cb3df90f2a1f",
        //     }
        // },
    ]);
    const [query, setQuery] = useState("");

    const formatDate = (timestamp) => {

    };

    const handleBotBtnClick = () => {
        setShowChatbot(!showChatbot);
    };

    const handleChatInput = (e) => {
        const q = e.target.value;
        setQuery(q);
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        const newChat = {
            timestamp: new Date(),
            type: "query",
            payload: {
                text: query
            }
        };
        setChats([...chats, newChat]);
        setQuery("");
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
                                <small className='chat_time_data'>4:29PM</small>
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
            default:
                return null;
        }
    };

    const renderInputUnit = () => {
        return (
            <form className='chat_form' onSubmit={(e) => handleChatSubmit(e)}>
                <textarea value={query} name="chat_input" id="chat_input" className='chat_input' rows="1" onInput={(e) => handleChatInput(e)} placeholder='Write Your query ...'></textarea>
                <Button type='submit' className='chat_submit_btn'>
                    <SendRoundedIcon className='send_icon' />
                </Button>
            </form>
        );
    };

    const renderChats = () => {

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