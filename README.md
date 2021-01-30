# simple-WebRTC-Implementation
A simple WebRTC implementation consisting of no remote peer but streaming video to another element using Peer Connection. This is to ignore Signalling part which if implemented, would have complicated the system. 

Two RTCPeerConnection instance are created on the same webpage and offer, answer, ice candidates are exchanged between them thus, leaving out actual signalling part. 

Project uses Express.js and Node.js to provide ability to access the webpage on localhost through server listening on port 3000.
