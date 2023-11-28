console.clear();
window.onload = async () => {
  const 
    chat = document.querySelector("#chat"),
    video = document.querySelector("#video"),
    status = document.querySelector("#status"),
    peerId = document.querySelector("#peerId"),
    callBtn = document.querySelector("#callBtn"),
    chatInput = document.querySelector("#chatInput"),
    connection = document.querySelector("#connection");
  
  const audio = await navigator.mediaDevices.getUserMedia({video: false, audio: true})

  const peer = new Peer({ 
    config: {'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] },
    timeout: 120000
  });

  peer.on('open', id => {
    status.innerHTML = "Online";
    peerId.innerHTML = id;
    let call;
    const chatHandler = function(conn) {
      status.innerHTML = "Connected to remote";
      connection.style.display = "none";
      chatInput.style.visibility = "visible";
      callBtn.style.display = "block";
      
      const endCall = function(e) {
        status.innerHTML = "Connected to remote";
        callBtn.innerHTML = "Voice Call";
        console.log(e)
        callBtn.onclick = makeCall;
        call?.close();
      }
      const makeCall = function({target}) {
        target.innerHTML = "End call";
        call = peer.call(conn.peer,	audio);
        
        call.on('stream', function(stream) {
          status.innerHTML = "Connected to voice";
          video.srcObject = stream;
          video.play();
          
          callBtn.onclick = endCall;
          call.on('close', endCall);
          call.on('error', endCall);
        })
      }

      callBtn.onclick = makeCall;

      conn.on('data', function(data) {
        const msg = document.createElement("li");
        msg.innerHTML = 'Remote: ' + data;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
      });

      conn.on('close', function() {
        status.innerHTML = "Disconnected from remote";
        connection.style.display = "block";
        chatInput.style.visibility = "collapse";
        callBtn.style.display = "none";
      })

      conn.on('error', function(e) {
        status.innerHTML = "Disconnected from remote with error";
        connection.style.display = "block";
        chatInput.style.visibility = "collapse";
        callBtn.style.display = "none";
        console.log(e);
      })

      chatInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          if(!chatInput.value) return;
          conn.send(chatInput.value)
          const msg = document.createElement("li");
          msg.innerHTML = 'You: ' + chatInput.value;
          chat.appendChild(msg);
          chatInput.value = "";
          chat.scrollTop = chat.scrollHeight;
        }
      });
    }

    connection.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        if(!connection.value) return;
        const c = peer.connect(connection.value.trim())
        c.on('open', () => chatHandler(c))
        connection.value = "";
        connection.style.visibility = "collapsed";
      }
    });

    peer.on('connection', c => c.on('open', () => chatHandler(c)))

    peer.on('close', () => {
      status.innerHTML = "Offline";
    })
    peer.on('error', (e) => {
      status.innerHTML = "Error " + e.type;
    })

    peer.on('call', call => {
      call.answer(audio);
      
      call.on('stream', function(stream) {
        status.innerHTML = "Connected to voice";
        callBtn.innerHTML = "End call";
        video.srcObject = stream;
        video.play();
        
        callBtn.onclick = endCall;
        call.on('close', endCall);
        call.on('error', endCall);
      })


      const endCall = function(e) {
        status.innerHTML = "Connected to remote";
        callBtn.innerHTML = "Voice Call";
        callBtn.onclick = makeCall;
        console.log(e)
        call?.close();
      }
      const makeCall = function({target}) {
        status.innerHTML = "Connected to voice";
        target.innerHTML = "End call";
        
        call.on('stream', function(stream) {
          video.srcObject = stream;
          video.play();
          
          callBtn.onclick = endCall;
          call.on('close', endCall);
          call.on('error', endCall);
        })
      }

      callBtn.onclick = endCall;
    });
  });


}




