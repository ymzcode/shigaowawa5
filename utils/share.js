export function createArticleShare(title, imageUrl, path) {
	return {
		title: `[DIY手工展览馆] - ${title}`,
		imageUrl,
		path
	}
}