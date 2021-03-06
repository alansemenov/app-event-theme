window.addEventListener('DOMContentLoaded', (event) => { // activate the script after everything has loaded
    // actions
    function getAndSendQueryWord(event) {
        let input = document.getElementById('search-input');
        window.location.href = input.getAttribute('data-home') + '/search-results' + '?search=' + input.value
    };
    
    function getAndSendCategory(event) {
        let category = this.getAttribute('value');
        let home = this.getAttribute('home');
        window.location.href = home + '/search-results' + '?category=' + category
    }

    function getAndSendTag(event) {
        let tag = this.getAttribute('value');
        let home = this.getAttribute('home');
        window.location.href = home + '/search-results' + '?tag=' + tag
    };
    
    // listeners
    try { // regular
        document.getElementById('search-icon').addEventListener('click', getAndSendQueryWord);
        document.getElementById('search-input').addEventListener('keyup', function(event) {        
            if (event.key === 'Enter') {
                event.preventDefault();
                document.getElementById('search-icon').click();
            }
        });
    } catch(err) {}

    try { // category
        for (let i = 0; i < document.getElementsByClassName('category-list-item').length; i++) {
            let element = document.getElementsByClassName('category-list-item')[i];
            element.addEventListener('click', getAndSendCategory);        
        }        
    } catch(err) {}

    try { // tag
        for (let i = 0; i < document.getElementsByClassName('tag-list-item').length; i++) {
            let element = document.getElementsByClassName('tag-list-item')[i];
            element.addEventListener('click', getAndSendTag);
            element.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') { // Number 13 is the "Enter" key on the keyboard
                    element.click();
                }
            }); 
        }        
    } catch(err) {}
});
