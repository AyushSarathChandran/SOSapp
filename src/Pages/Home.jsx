import React, { useEffect } from 'react';
import { generateToken, messaging } from "../Notifications/firebase";
import { onMessage, getToken } from "firebase/messaging";

const Home = () => {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log('Foreground message:', payload);
    });
  }, []);

  const handleAlertClick = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: "BCA3ZC_UkG5NZz1DZSeCEiMLekjxv4yj-d0mUvaLu8W0LBzj0q9cl92uHjVqnL60x1MXq3PCo8iwxfBdd9oyDAw",
        });
        console.log('FCM Token:', token);

        const response = await fetch('https://us-central1-sosapp-de6ef.cloudfunctions.net/sendNotification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers.get('content-type'));

        if (!response.ok) {
          const text = await response.text();
          console.log('Raw response:', text);
          throw new Error(`Server responded with status ${response.status}: ${text}`);
        }

        const data = await response.json();
        console.log('Notification request response:', data);
      } else {
        console.log('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error handling alert click:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <a href="#" className="button" id="bt" onClick={handleAlertClick}>
          <div className="button__content">
            <span className="button__text">ALERT!</span>
            <div className="button__shape-1"></div>
            <div className="button__shape-2"></div>
            <div className="button__shape-3"></div>
            <div className="button__shape-4"></div>
          </div>
          <div className="button__shadow"></div>
        </a>
      </div>
    </div>
  );
};

export default Home;