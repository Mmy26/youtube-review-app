// https://www.googleapis.com/youtube/v3/
// channels?forUsername=hikakintv&
// key=AIzaSyChyFfGpQSYRhWTBuyeXTflkqTd4Sgc1HU&
// part=snippet,contentDetails,statistics,status

const JSON = {
  kind: "youtube#channelListResponse",
  etag: "iXc8eRQS8JTdaAHySo05fYv5qBI",
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 5,
  },
  items: [
    {
      kind: "youtube#channel",
      etag: "yDFuJUHzqlQP7evlaOYvzrIuNLM",
      id: "UCZf__ehlCEBPop-_sldpBUQ",
      snippet: {
        title: "HikakinTV",
        description:
          "HikakinTVはヒカキンが面白いものを紹介するチャンネルです。\n◆プロフィール◆\nYouTubeにてHIKAKIN、HikakinTV、HikakinGames、HikakinBlogと\n４つのチャンネルを運営し、動画の総アクセス数は150億回を突破、\nチャンネル登録者数は計1800万人以上、YouTubeタレント事務所uuum株式会社ファウンダー兼最高顧問。",
        publishedAt: "2011-07-19T11:31:43Z",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLQZxfFwNwOkE2Kp_uQtMdjRMLONxs1OFdOKFh8MJw=s88-c-k-c0x00ffffff-no-rj",
            width: 88,
            height: 88,
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLQZxfFwNwOkE2Kp_uQtMdjRMLONxs1OFdOKFh8MJw=s240-c-k-c0x00ffffff-no-rj",
            width: 240,
            height: 240,
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLQZxfFwNwOkE2Kp_uQtMdjRMLONxs1OFdOKFh8MJw=s800-c-k-c0x00ffffff-no-rj",
            width: 800,
            height: 800,
          },
        },
        localized: {
          title: "HikakinTV",
          description:
            "HikakinTVはヒカキンが面白いものを紹介するチャンネルです。\n◆プロフィール◆\nYouTubeにてHIKAKIN、HikakinTV、HikakinGames、HikakinBlogと\n４つのチャンネルを運営し、動画の総アクセス数は150億回を突破、\nチャンネル登録者数は計1800万人以上、YouTubeタレント事務所uuum株式会社ファウンダー兼最高顧問。",
        },
      },
      contentDetails: {
        relatedPlaylists: {
          likes: "",
          uploads: "UUZf__ehlCEBPop-_sldpBUQ",
        },
      },
      statistics: {
        viewCount: "9443043819",
        subscriberCount: "10600000",
        hiddenSubscriberCount: false,
        videoCount: "3099",
      },
      status: {
        privacyStatus: "public",
        isLinked: true,
        longUploadsStatus: "longUploadsUnspecified",
        madeForKids: false,
      },
    },
  ],
};
