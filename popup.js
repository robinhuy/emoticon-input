/**
 * Created by Robin Huy
 */

/**
 * Copy Emoji to clipboard
 */
function copyToClipboard() {
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

            // Remove dummy input
            document.body.removeChild(input);

            // Notify to user
            //todo: Hien thi notify: Copied to clipboard

            // Close extension tab
            //todo: Tat cua so extension
        });
    }
}

/**
 * Search Emoji by keyword
 */
function searchEmoji() {

}

/**
 * Filter Emoji by categories
 */
function filterEmoji() {

}

document.addEventListener('DOMContentLoaded', function () {
    copyToClipboard();
});
