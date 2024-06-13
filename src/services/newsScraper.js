import axios from "axios";

/**
 * Get TurnBackHoax.id's news thumbnail
 *
 * @param {string} url
 * @returns {string} thumbnail url
 */
const getThumbnail = async (url) => {
  const THUMBNAIL_REGEX = /<figure\s+class="entry-thumbnail">.*?<img\s+[^>]*src="([^"]+)"[^>]*>.*?<\/figure>/si;

  const { data: newsDetail } = await axios.get(url);
  return newsDetail.match(THUMBNAIL_REGEX)[1] || ""
}

/**
 * Get news from turnbackhoax.id
 *
 * @returns Object
 */
const getNews = async () => {
  const NEWS_SITE = "https://turnbackhoax.id/feed";

  const { data: fetchFeed } = await axios.get(
    "https://www.toptal.com/developers/feed2json/convert?url=" + encodeURI(NEWS_SITE));

  const { items } = fetchFeed
  const result = items.map(async (item, i) => {
    const thumbnail = await getThumbnail(item.url);
    const content = item.summary
      .replace(/<[^>]*>/g, "")
      .replace(/\[\.\.\.]/g, "...");

    const createdAt = item.date_published;
    const updatedAt = createdAt;

    return {
      id: (i + 1),
      title: item.title,
      image_url: thumbnail,
      content,
      link: item.url,
      createdAt,
      updatedAt,
    }
  })

  return await Promise.all(result)
}

export default getNews
