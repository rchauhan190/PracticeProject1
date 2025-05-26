// utils/joinLiveEvent.js
import axios from 'axios';

export const joinLiveEvent = async (accessToken, chatId) => {
  const url = `https://api.staging.springprod.com/chat/v1/live-event/join/${chatId}`;

  const response = await axios.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
