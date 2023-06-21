import { useState } from "react";

interface RelativeTimeProps {
  timestamp: string;
}

const RelativeTime: React.FC<RelativeTimeProps> = ({ timestamp }) => {
  const [showFullTime, setShowFullTime] = useState(false);

  const toggleShowFullTime = () => {
    setShowFullTime(!showFullTime);
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Date(date).toLocaleDateString("tr-TR", options);
  };

  const formatRelativeTime = (date: string) => {
    const currentTime = new Date();
    const diff = currentTime.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} gün önce`;
    } else if (hours > 0) {
      return `${hours} saat önce`;
    } else if (minutes > 0) {
      return `${minutes} dakika önce`;
    } else {
      return `${seconds} saniye önce`;
    }
  };

  return (
    <span onMouseEnter={toggleShowFullTime} onMouseLeave={toggleShowFullTime}>
      {showFullTime ? formatDate(timestamp) : formatRelativeTime(timestamp)}
    </span>
  );
};

export default RelativeTime;
