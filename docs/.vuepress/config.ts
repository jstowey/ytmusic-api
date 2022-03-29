import { defineUserConfig } from "vuepress"
import { path } from "@vuepress/utils"
import type { DefaultThemeOptions } from "vuepress"

export default defineUserConfig<DefaultThemeOptions>({
	title: "YTMusic API",
	description: "Unofficial YouTube Music API for TypeScript",
	plugins: [
		[
			"@vuepress/register-components",
			{
				components: {
					CodeLink: path.resolve(__dirname, "./components/CodeLink.vue")
				}
			}
		]
	],
	themeConfig: {
		repo: "zS1L3NT/ts-npm-ytmusic-api",
		editLink: false,
		navbar: [
			{ text: "Home", link: "/" },
			{ text: "Guides", link: "/guides/getting-started.html" },
			{ text: "References", link: "/references/ytmusic-methods/getSearchSuggestions.html" }
		],
		sidebar: [
			{
				text: "Guides",
				collapsible: true,
				children: [
					{
						text: "Getting Started",
						link: "/guides/getting-started.html"
					},
					{
						text: "Usage",
						link: "/guides/usage.html",
						children: [
							{
								text: "Getting search suggestions",
								link: "/guides/usage/getSearchSuggestions.html"
							},
							{
								text: "Searching for results",
								link: "/guides/usage/search.html"
							},
							{
								text: "Searching for songs",
								link: "/guides/usage/searchSong.html"
							},
							{
								text: "Searching for videos",
								link: "/guides/usage/searchVideo.html"
							},
							{
								text: "Searching for artists",
								link: "/guides/usage/searchArtist.html"
							},
							{
								text: "Searching for albums",
								link: "/guides/usage/searchAlbum.html"
							},
							{
								text: "Searching for playlists",
								link: "/guides/usage/searchPlaylist.html"
							},
							{
								text: "Getting a song",
								link: "/guides/usage/getSong.html"
							},
							{
								text: "Getting a video",
								link: "/guides/usage/getVideo.html"
							},
							{
								text: "Getting an artist",
								link: "/guides/usage/getArtist.html"
							},
							{
								text: "Getting an artist's top songs",
								link: "/guides/usage/getArtistSongs.html"
							},
							{
								text: "Getting an artist's top albums",
								link: "/guides/usage/getArtistAlbums.html"
							},
							{
								text: "Getting an album",
								link: "/guides/usage/getAlbum.html"
							},
							{
								text: "Getting a playlist",
								link: "/guides/usage/getPlaylist.html"
							},
							{
								text: "Getting a playlist's videos",
								link: "/guides/usage/getPlaylistVideos.html"
							}
						]
					}
				]
			},
			{
				text: "References",
				collapsible: true,
				children: [
					{
						text: "Interfaces",
						children: [
							{
								text: "ThumbnailFull",
								link: "/references/interfaces/ThumbnailFull.html"
							},
							{
								text: "SongDetailed",
								link: "/references/interfaces/SongDetailed.html"
							},
							{
								text: "SongFull",
								link: "/references/interfaces/SongFull.html"
							},
							{
								text: "VideoDetailed",
								link: "/references/interfaces/VideoDetailed.html"
							},
							{
								text: "VideoFull",
								link: "/references/interfaces/VideoFull.html"
							},
							{
								text: "ArtistBasic",
								link: "/references/interfaces/ArtistBasic.html"
							},
							{
								text: "ArtistDetailed",
								link: "/references/interfaces/ArtistDetailed.html"
							},
							{
								text: "ArtistFull",
								link: "/references/interfaces/ArtistFull.html"
							},
							{
								text: "AlbumBasic",
								link: "/references/interfaces/AlbumBasic.html"
							},
							{
								text: "AlbumDetailed",
								link: "/references/interfaces/AlbumDetailed.html"
							},
							{
								text: "AlbumFull",
								link: "/references/interfaces/AlbumFull.html"
							},
							{
								text: "PlaylistFull",
								link: "/references/interfaces/PlaylistFull.html"
							}
						]
					},
					{
						text: "Types",
						children: [
							{
								text: "SearchResult",
								link: "/references/types/SearchResult.html"
							}
						]
					}
				]
			}
		]
	}
})
