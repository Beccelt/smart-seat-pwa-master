function connectToBle() {
    // Connect to a device by passing the service UUID of the HM-10... not sure about the HM-05
    blueTooth.connect(0xFFE0, gotCharacteristics);
}

function disconnectFromBle() {
    blueTooth.disconnect();
    document.querySelector('.connection__state').innerHTML = "Not Connected";
}


// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
    if (error) {
        console.log('error: ', error);
    }
    console.log('characteristics: ', characteristics);
    blueToothCharacteristic = characteristics[0];

    blueTooth.startNotifications(blueToothCharacteristic, gotValue, 'string');

    isConnected = blueTooth.isConnected();
    document.querySelector('.connection__state').innerHTML = "Connected";
    // Add a event handler when the device is disconnected
    blueTooth.onDisconnected(onDisconnected);
}

// A function that will be called once got values
function gotValue(value) {
    console.log('value: ', value);
    if (value == 'Push Button') {
        receivedValue = "Push Button Pressed";
    } else {
        receivedValue = " ";
    }
}


function onDisconnected() {
    console.log('Device got disconnected.');
    isConnected = false;
}

function sendData(command) {
    const inputValue = command;
    if (!("TextEncoder" in window)) {
        console.log("Sorry, this browser does not support TextEncoder...");
    }
    var enc = new TextEncoder(); // always utf-8
    blueToothCharacteristic.writeValue(enc.encode(inputValue));
}

