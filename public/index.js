const localVideo = document.getElementById('localVideo');
const peerVideo = document.getElementById('peerVideo');

// execute start function when user clicks on start button
document.getElementById('start').addEventListener('click', () => {
    document.getElementById('peers').style.zIndex = "1";
    document.getElementById('local').style.zIndex = "2";
    start();
});

// Our Entire WebRTC lifecycle
async function start() {
    // getting user's video and mic permission and stream
    const stream = await navigator.mediaDevices.getUserMedia( {audio: true, video: true} );

    // display local video on local video element
    localVideo.srcObject = stream;

    // initiate Peer connection by creating RTCPeerconnection
    const PC1 = new RTCPeerConnection(); // local end of the connection
    const PC2 = new RTCPeerConnection(); // peer end of the connection

    // add ice candidate
    PC1.addEventListener('icecandidate', ({candidate}) => PC2.addIceCandidate(candidate) );
    PC2.addEventListener('icecandidate', ({candidate}) => PC1.addIceCandidate(candidate) );

    // get tracks from our stream
    stream.getTracks().forEach(track => PC1.addTrack(track, stream));

    // listen on peer end of the connection
    PC2.addEventListener('track', ({streams: [stream]}) => {
        // display on peer video element
        peerVideo.srcObject = stream;
    });

    // create offer
    const offer = await PC1.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    });

    // setting offer
    await PC1.setLocalDescription(offer);
    await PC2.setRemoteDescription(offer);

    // create answer
    const answer = await PC2.createAnswer();

    // set answer
    await PC2.setLocalDescription(answer);
    await PC1.setRemoteDescription(answer);
};