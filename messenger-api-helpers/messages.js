/**
 * Best Shop
 * 
 * receive.js
 * 
 * Copyright 2019-present, AloesLu. All rights reserved.
 */

/**
 * Button for opening a new list in a webview
 *
 * @param {string} apiUri - Hostname of the server.
 * @param {string=} buttonTitle - Button title.
 * @returns {object} -
 *   Message to create a button pointing to the new list form.
 */
const createListButton = (apiUri, buttonTitle = 'Welcome') => {
  return {
    type: 'web_url',
    url: `${apiUri}/`,
    title: buttonTitle,
    webview_height_ratio: 'tall',
    messenger_extensions: true,
  };
};

/*
 * MESSAGES
 *
 * Objects and methods that create objects that represent
 * messages sent to Messenger users.
 */

/**
 * Message that welcomes the user to the bot
 *
 * @param {string} apiUri - Hostname of the server.
 * @returns {object} - Message with welcome text and a button to start a new list.
 */
const welcomeMessage = (apiUri) => {
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'Welcome to Main Page.',
        buttons: [
          createListButton(apiUri),
        ],
      },
    },
  };
};

export default {
  welcomeMessage,
  createListButton,
};
