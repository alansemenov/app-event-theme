var libPortal = require('/lib/xp/portal');
var libContent = require('/lib/xp/content');
var libThymeleaf = require('/lib/thymeleaf');
var libUtil = require('/lib/util');

var viewFile = resolve('search-results.html');

exports.get = function (req) {

	/* ### Collect ### */
	let content = libPortal.getContent(); // Get current content that is viewed. See the docs for JSON format.
	let component = libPortal.getComponent(); // Or, get config (if any) for this particular part. See the docs for JSON format.	
	/* var config = component.config; */

	/* ### Manipulate ### */
	/* let searchWord = decodeURI(req.url.substring(req.url.search('=') + 1, req.url.length)); */
	/* log.info('search-results2.js JSON %s', JSON.stringify(searchWord, null, 4)); */

	/* ------------------------------------------------------ */
	let splittedAbsoluteURL = decodeURI(req.url).split('/');
	let dataUrl = splittedAbsoluteURL[splittedAbsoluteURL.length - 1];
	let searchBy = dataUrl.substring(dataUrl.search("\\?") + 1, dataUrl.search("=")); // 'category' or 'tag'
	let searchWord = dataUrl.substring(dataUrl.search("=") + 1, dataUrl.length);

	/* log.info(' ');
	log.info(' '); */
	/* log.info('search-results2.js JSON %s', JSON.stringify(splittedAbsoluteURL, null, 4)); */
	/* log.info('search-results2.js JSON %s', JSON.stringify(dataUrl, null, 4));
	log.info('search-results2.js JSON %s', JSON.stringify(searchBy, null, 4));
	log.info('search-results2.js JSON %s', JSON.stringify(searchWord, null, 4));
	log.info(' ');
	log.info(' '); */
	/* ------------------------------------------------------ */

	let result = { hits: [] };
	if (searchWord !== '') {
		if (searchBy === 'search') {
			result = libContent.query({ // query bruker 'string literals'
				start: 0,
				count: 10,
				query: `displayName = '${searchWord}^10' OR 
		displayName LIKE '*${searchWord}*^5' OR					
		fulltext('_allText', "${searchWord}", 'OR')
		`,
				contentTypes: [
					app.name + ':news-article',
					app.name + ':speaker',
				]
			});
			/* fulltext('data.personalInformation, data.description', "${searchWord}", 'OR') */
			/* log.info('search.js JSON %s', JSON.stringify(result, null, 4)); */
		} else if (searchBy === 'category' || searchBy === 'tag') {
			result = libContent.query({
				query: "data." + searchBy + " = '" + searchWord + "'",
				contentTypes: [app.name + ':news-article']
			});

			libUtil.data.forceArray(result.hits).forEach(element => { // for each element get their respective working url's
				element.url = libPortal.pageUrl({ id: element._id })
			});
		}

		libUtil.data.forceArray(result.hits).forEach(element => { // for each element get their respective working url's
			element.url = libPortal.pageUrl({ id: element._id })
		});
	}

	let siteUrl = libPortal.pageUrl({
		id: libPortal.getSite()._id
	});

	/* ### Prepare ### */
	let model = {
		content: content,
		component: component,
		searchWord: searchWord,
		results: result.hits,
		resultLength: result.hits.length,
		home: siteUrl,
	};

	/* ### Return ### */
	return {
		body: libThymeleaf.render(viewFile, model)
	};
};
