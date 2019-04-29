/**
 * Best Shop
 * 
 * receive.js
 * 
 * Copyright 2019-present, AloesLu. All rights reserved.
 */

// ===== MESSENGER =============================================================
import sendApi from './send';

/*
 * handleReceivePostback
 * https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_postbacks
 */
const handleReceivePostback = (event) => {
  const type = event.postback.payload;
  const senderId = event.sender.id;

  if (type.substring(0, 11) === 'owned_lists') {
  } else if (type.substring(0, 16) === 'subscribed_lists') {
  } else if (type.substring(0, 11) === 'get_started') {
    return;
  }

  sendApi.sendMessage(senderId, `Unknown Postback called: ${type}`);
};

/*
 * handleReceiveMessage
 * https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
 */
const handleReceiveMessage = (event) => {
  const message = event.message;
  const senderId = event.sender.id;

  sendApi.sendReadReceipt(senderId);

  if (message.text) { sendApi.sendWelcomeMessage(senderId); }
};

/*
 * handleReceiveReferral
 * https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messaging_referrals
 */
const handleReceiveReferral = (event) => {
  const message = event.message;
  const senderId = event.sender.id;

  sendApi.sendReadReceipt(senderId);

  if (message.text) { sendApi.sendWelcomeMessage(senderId); }
};

export default {
  handleReceivePostback,
  handleReceiveMessage,
  handleReceiveReferral,
};
