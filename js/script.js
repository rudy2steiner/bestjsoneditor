window.onload = () => {
    const pageLoadUnix = moment().valueOf();
    const dateTimeFormat = 'YYYY-MM-DD[T]HH:mm:ss';

    // Show the current Unix timestamp when not hovering (potentially copying to clipboard)
    let currentTask;
    const current = document.getElementById('current-time');
    const currentStopped = document.getElementById('current-time-stopped');
    const currentIs = document.getElementById('current-time-is');
    const startCurrentTask = () => {
        const setCurrentTime = () => {
            current.textContent = moment().unix();
        };
        currentTask = window.setInterval(setCurrentTime, 100);
        setCurrentTime();
    };
    current.addEventListener('mouseenter', () => {
        currentStopped.style.display = 'none';
        currentIs.textContent = 'was';
        window.clearInterval(currentTask);
    });
    current.addEventListener('mouseleave', () => {
        currentStopped.style.display = 'inline';
        currentIs.textContent = 'is';
        startCurrentTask();
    });
    startCurrentTask();

    // Convert Unix timestamps to human readable dates
    // Input: 1500000000
    const convertFromInput = document.getElementById('convert-from');
    const convertFromOutput = document.getElementById('convert-from-output');
    const convertFromOutputTz = document.getElementById('convert-from-output-tz');
    const convertFrom = e => {
        convertFromOutput.textContent = moment.unix(e.target.value/1000).utc().format('ddd MMM DD YYYY HH:mm:ss') + ' UTC';
        convertFromOutputTz.textContent = moment.unix(e.target.value/1000).format('YYYY-MM-DD HH:mm:ss');
    };
    convertFromInput.addEventListener('keyup', convertFrom);
    convertFromInput.addEventListener('change', convertFrom);
    convertFromInput.value = pageLoadUnix;
    convertFrom({ target: { value: pageLoadUnix } });

    // Convert datetime-local input to Unix timestamps
    // Input: 2017-09-06T09:00
    const convertToInput = document.getElementById('convert-to');
    const convertToOutput = document.getElementById('convert-to-output');
    const convertTo = e => {
        convertToOutput.textContent = moment(e.target.value).unix();
    };
    convertToInput.addEventListener('keyup', convertTo);
    convertToInput.addEventListener('change', convertTo);
    const nowDate = moment().format(dateTimeFormat);
    convertToInput.value = nowDate;
    convertTo({ target: { value: nowDate }});

    // Parse any moment date and convert to human readable date and Unix timestamp
    const parseInput = document.getElementById('parse-date');
    const parseOutput = document.getElementById('parse-output');
    const parseUnixOutput = document.getElementById('parse-output-unix');
    const parse = e => {
        const p = moment(e.target.value).utc();
        parseOutput.textContent = p;
        parseUnixOutput.textContent = p.unix();
    };
    parseInput.addEventListener('keyup', parse);
    parseInput.addEventListener('change', parse);
    const isoDate = moment().toISOString();
    parseInput.value = isoDate;
    parse({ target: { value: isoDate }});
};
