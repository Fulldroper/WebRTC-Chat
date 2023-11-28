# Peer Communication App

## Project Description

This project is a simple peer-to-peer (P2P) communication application that allows users to establish audio communication and exchange text messages. It leverages the WebRTC technology and PeerJS library to facilitate real-time communication between peers.

### Features
- **Voice Call:** Users can initiate voice calls with each other, enabling real-time audio communication.
- **Text Chat:** The application includes a text chat feature for users to exchange messages during the communication session.

## How It Works

### Setting Up the Environment
1. Clone the repository to your local machine.
2. Open `index.html` in a web browser.

### Establishing a Connection
1. Open the application in two separate browser tabs or devices.
2. Each user is assigned a unique peer ID, displayed on the webpage.
3. Enter the peer ID of the remote user in the "Another client id" input field and press Enter to establish a connection.

### Text Chat
- Users can exchange text messages by typing in the "Enter message" input field and pressing Enter.
- Messages are displayed in the chat window, allowing users to communicate in real-time.

### Voice Call
- Users can initiate a voice call by clicking the "Voice Call" button.
- The call button changes to "End Call" during an active call, allowing users to terminate the voice call.

### Status Updates
- The application provides status updates such as "Online," "Connected to remote," and "Disconnected," reflecting the current state of the communication.

## Dependencies
- [PeerJS](https://peerjs.com/): Simplifies WebRTC peer-to-peer data, video, and audio calls.
