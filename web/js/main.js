// it's a flag for toggleMonitor()
let monitor = null;



// toggles the setInterval and clearInterval for update()
function toggleMonitor() {
    let toggleBTN = document.getElementById('toggle-btn')
    if (!monitor) {

        update();

        toggleBTN.classList.toggle('btn-success')
        toggleBTN.classList.toggle('btn-danger')
        toggleBTN.innerText = 'stop'

        monitor = setInterval(update, 5000);

    } else {
        toggleBTN.classList.toggle('btn-danger')
        toggleBTN.classList.toggle('btn-success')
        toggleBTN.innerText = 'star'

        clearInterval(monitor);
        monitor = null;
    }

}


// get the raw data from python and updates the html
function update() {

    eel.get_data()(result => {

        let data = JSON.parse(result);

        console.log(data);

        let downloadedEl = document.getElementById('downloaded');
        let uploadedEl = document.getElementById('uploaded');

        downloadedEl.querySelector('p').innerText = data.download_amt.value;
        downloadedEl.querySelector('span').innerText = data.download_amt.prefix;

        uploadedEl.querySelector('p').innerText = data.upload_amt.value;
        uploadedEl.querySelector('span').innerText = data.upload_amt.prefix;
    })
}