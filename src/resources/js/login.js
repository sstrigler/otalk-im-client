if (localStorage.authFailed) {
    document.getElementById('auth-failed').style.display = 'block';
    localStorage.removeItem('authFailed');
}

document.getElementById('login-form').addEventListener('submit', function (e) {
    function value(id) {
        return document.getElementById(id).value;
    }

    var jid = value('jid');
    if (SERVER_CONFIG.domain && jid.indexOf('@') == -1)
         jid += "@" + SERVER_CONFIG.domain;
    var password = value('password');
    var connURL = SERVER_CONFIG.wss ? SERVER_CONFIG.wss : value('connURL');
    var publicComputer = document.getElementById('public-computer').checked;

    var transport;
    var wsURL = '';
    var boshURL = '';
    if (connURL.indexOf('http') === 0) {
        boshURL = connURL;
        transport = 'bosh';
    } else if (connURL.indexOf('ws') === 0) {
        wsURL = connURL;
        transport = 'websocket';
    }
    
    var softwareVersion = SERVER_CONFIG.softwareVersion;
    if (softwareVersion) {
        softwareVersion.os = navigator.userAgent
    }     

    localStorage.config = JSON.stringify({
        jid: jid,
        server: jid.slice(jid.indexOf('@') + 1),
        wsURL: wsURL,
        boshURL: boshURL,
        transports: [transport],
        credentials: {
            password: password
        },
        saveCredentials: !publicComputer,
        softwareVersion: softwareVersion
    });

    window.location = './';

    e.preventDefault();
});
