/**
 * Best Shop
 * 
 * send.js
 * 
 * Copyright 2019-present, AloesLu. All rights reserved.
 */

// ===== LODASH ================================================================
import castArray from 'lodash/castArray';

// ===== MESSENGER =============================================================
import messages from './messages';
import api from './api';

const {APP_URL} = process.env;

/**
 * sender_action（发送者操作状态）
 * https://developers.facebook.com/docs/messenger-platform/send-messages/sender-actions 
 */ 
//开始输入提示
const typingOn = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_on',
  };
};
//关闭输入提示
const typingOff = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_off',
  };
};
//将上一条消息标记已读
const sendReadReceipt = (recipientId) => {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    sender_action: 'mark_seen',
  };

  api.callMessagesAPI(messageData);
};

// Wraps a message JSON object with recipient information.
const messageToJSON = (recipientId, messagePayload) => {
  return {
    recipient: {
      id: recipientId,
    },
    message: messagePayload,
  };
};

// Send one or more messages using the Send API.
const sendMessage = (recipientId, messagePayloads) => {
  const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(recipientId, messagePayload));

  api.callMessagesAPI([
    typingOn(recipientId),
    ...messagePayloadArray,
    typingOff(recipientId),
  ]);
};

// Send the initial message welcoming & describing the bot.
const sendWelcomeMessage = (recipientId) => {
  sendMessage(recipientId, messages.welcomeMessage(APP_URL));
};

export default {
  sendMessage,
  sendReadReceipt,
  sendWelcomeMessage,
};
