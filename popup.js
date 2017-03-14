/**
 * Created by Robin Huy
 */

/**
 * Handle event when user click to Emoticon
 */
function handleOnclickEmoticon() {
    var span = document.getElementsByTagName('span');

    for (var i = 0; i < span.length; i++) {
        span[i].addEventListener('click', function () {
            // Create dummy input and set value to span's text
            var input = document.createElement('input');
            input.value = this.innerText;
            document.body.appendChild(input);

            // Select dummy input then copy selection
            input.select();
            document.execCommand('copy');

            // Update frequently used emoticons
            setRecentlyEmoticons(JSON.stringify({
                title: this.title,
                characters: this.innerText
            }));
            displayFrequentlyEmoticons();

            // Remove dummy input
            document.body.removeChild(input);

            // Notify to user
            //todo: Hiển thị notify: Copied to clipboard

            // Close extension tab
            //todo: Tắt cửa sổ extension
        });
    }
}

/**
 * Search Emoticon by keyword
 */
function searchEmoticon() {
    //todo: Tìm kiếm emoticon theo title
}

/**
 * Filter Emoticons by categories
 */
function filterEmoticons() {
    //todo: Lọc emoticon theo danh mục
}

/**
 * Get frequently used emoticons from local storage
 */
function getRecentlyEmoticons() {
    if (typeof(Storage) !== 'undefined') {
        var data;

        try {
            data = JSON.parse(localStorage.getItem('frequently_used')) || [];
        } catch (e) {
            data = [];
        }

        return data;
    } else {
        return [];
    }
}

/**
 * Save recently used emoticon to local storage
 * @param emoticon{string} - JSON Stringify represents emoticon like: "{title: '', characters: ''}"
 */
function setRecentlyEmoticons(emoticon) {
    var data = getRecentlyEmoticons();

    // Remove this emoticon if already exist
    if (data.indexOf(emoticon) !== -1)
        data.splice(data.indexOf(emoticon), 1);

    // Add this emoticon to top
    data.unshift(emoticon);

    // Limit 10 frequently emoticons
    if (data.length > 10)
        data.pop();

    if (typeof(Storage) !== 'undefined') {
        localStorage.setItem('frequently_used', JSON.stringify(data));
    }
}

/**
 * Display frequently emoticons
 */
function displayFrequentlyEmoticons() {
    var data = getRecentlyEmoticons();

    var emoticons = '';
    for (var i = 0; i < data.length; i++) {
        var emoticon = {};
        try {
            emoticon = JSON.parse(data[i]);
            emoticons += '<span title="' + emoticon.title + '">' + emoticon.characters + '</span>';
        } catch (err) {
            console.log(err);
        }
    }

    document.getElementById('frequently-emoticons').innerHTML = emoticons;
}

document.addEventListener('DOMContentLoaded', function () {
    displayFrequentlyEmoticons();
    handleOnclickEmoticon();
});
