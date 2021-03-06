var libPortal = require('/lib/xp/portal');
/* var libContent = require('/lib/xp/content'); */
var libThymeleaf = require('/lib/thymeleaf');
/* var libUtil = require('/lib/util'); */

var viewFile = resolve('contact.html');

exports.get = function(req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.
    let config = component.config;
	
    /* ### Manipulate ### */
    /* log.info('contact.js JSON %s', JSON.stringify(tickets, null, 4)); */

    /* ### Prepare ### */
	var model = {
		content: content,
        component: component,
        description: config.description,
        url: config.url,
    };

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};