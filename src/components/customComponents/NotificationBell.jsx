import React, { useEffect, useState } from "react";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import Badge from "./Badge";
import Link from "next/link";
import axios from "axios";
import { GET, GET_NOTIFICATIONS_COUNT } from "../utils/Const";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "@/redux/utils/apiActions";
import { API_DOMAIN } from "@/redux/utils/api";

const NotificationBell = () => {
  const notifTypes = {
    ADMIN_POST_APPROVE: "",
  };

  const userProfile = useSelector((state) => state.profile);
  console.log(userProfile, "arijit");

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const fetchNotificationCount = async () => {
    setLoading(true);
    try {
      const options = {
        method: GET,
        url: API_DOMAIN + `notifications/count?id=${userProfile._id}`,
        headers: { "Content-Type": "application/json" },
      };
      const responce = await axios(options);
      setLoading(false);
      setCount(responce?.data?.count);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userProfile._id) {
      fetchNotificationCount();
    } else {
      return;
    }
  }, [userProfile]);

  return (
    <Link href="/admin/notifications" className={`notification_comp`}>
      <div className="notif_comp_wrapper">
        <NotificationsRoundedIcon className="notif_bell_icon" />
        {!loading && <Badge value={count} />}
      </div>
    </Link>
  );
};

export default NotificationBell;
