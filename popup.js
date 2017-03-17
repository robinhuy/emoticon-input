/**
 * Created by Robin Huy
 */

/**
 * Handle event when user click to Tab
 */
function handleOnclickTab() {
    var tabs = document.getElementsByClassName('tab');

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function () {
            // Remove class "active" from all tabs
            for (var j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove('active');
            }

            // Add class "active" to chosen tab
            this.classList.add('active');

            // Hide all tab contents
            var tabContents = document.getElementsByClassName('tab-content');
            for (var k = 0; k < tabContents.length; k++) {
                tabContents[k].style.display = 'none';
            }

            // Show chosen tab content
            var tabId = this.children[0].getAttribute('href').replace('#', '');
            document.getElementById(tabId).style.display = 'block';
        });
    }
}

/**
 * Handle event when user click to Emoticon
 */
function handleOnclickEmoticon() {
    var span = document.getElementsByClassName('emoticon');

    for (var i = 0; i < span.length; i++) {
        span[i].addEventListener('click', function () {
            var self = this;

            // Create dummy input and set value to span's text
            var input = document.createElement('input');
            input.value = self.innerText;
            document.body.appendChild(input);

            // Select dummy input then copy selection
            input.select();
            document.execCommand('copy');

            // Update recently used emoticons
            setRecentlyEmoticons(JSON.stringify({
                title: self.title,
                characters: self.innerText
            }));
            displayRecentlyEmoticons();

            // Remove dummy input
            document.body.removeChild(input);

            // Close extension tab
            window.close();

            // Notification
            chrome.tabs.query({active: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'copy emoticon',
                    icon: self.innerText
                });
            });
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
 * Get recently used emoticons from local storage
 */
function getRecentlyEmoticons() {
    if (typeof(Storage) !== 'undefined') {
        var data;

        try {
            data = JSON.parse(localStorage.getItem('recently_used_emoticons')) || [];
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

    // Limit 10 recently emoticons
    if (data.length > 10)
        data.pop();

    if (typeof(Storage) !== 'undefined') {
        localStorage.setItem('recently_used_emoticons', JSON.stringify(data));
    }
}

/**
 * Display recently emoticons
 */
function displayRecentlyEmoticons() {
    var data = getRecentlyEmoticons();

    var emoticons = '';
    for (var i = 0; i < data.length; i++) {
        var emoticon = {};
        try {
            emoticon = JSON.parse(data[i]);
            emoticons += '<span class="emoticon" title="' + emoticon.title + '">' + emoticon.characters + '</span>';
        } catch (err) {
            console.log(err);
        }
    }

    document.getElementById('recently-emoticons').innerHTML = emoticons;
}

document.addEventListener('DOMContentLoaded', function () {
    displayRecentlyEmoticons();
    handleOnclickTab();
    handleOnclickEmoticon();
});
