module.exports = function (grunt) {

	var package = require("./package.json");
	var version = package.version,
		electronVersion = package.electronVersion;

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			browser: {
				src: [
						"js/default.js",
						"js/util/database.js",
						"js/util/defaultKeyMap.js",
						"js/util/settings.js",
						"js/util/searchEngine.js",
						"js/menuBarVisibility.js",
						 "js/tabState.js",
						"js/util/urlParser.js",
						"js/filteringRenderer.js",
						"js/webviews.js",
						 "js/webviewMenu.js",
						"js/bookmarksHistory/bookmarksHistory.js",
						 "js/api-wrapper.js",
						 "js/searchbar/searchbar.js",
							"js/searchbar/searchbar-plugins.js",
							"js/searchbar/searchbar-autocomplete.js",
							"js/searchbar/placesPlugin.js",
							"js/searchbar/instantAnswerPlugin.js",
							"js/searchbar/openTabsPlugin.js",
							"js/searchbar/bangsPlugin.js",
							"js/searchbar/customBangs.js",
							"js/searchbar/searchSuggestionsPlugin.js",
							"js/searchbar/placeSuggestionsPlugin.js",
							"js/searchbar/hostsSuggestionsPlugin.js",
							"js/readerview.js",
						 "js/navbar/tabActivity.js",
							"js/navbar/tabColor.js",
						 "js/navbar/navbarTabs.js",
							"js/taskOverlay.js",
							"js/navbar/addTabButton.js",
						 "js/keybindings.js",
						 "js/fileDownloadManager.js",
						 "js/findinpage.js",
							"js/sessionRestore.js",
							"js/focusMode.js",
							"js/util/theme.js"

						 ],
				dest: 'dist/build.js'
			},
			webview: {
				src: [
						"js/webview/default.js",
						"js/webview/textExtractor.js",
						"js/webview/contextMenu.js",
						"js/webview/phishDetector.js",
						"js/webview/readerDetector.js",
						"js/webview/swipeEvents.js",
						"js/webview/zoom.js",
						"js/webview/keywordExtractor.js",
						 ],
				dest: 'dist/webview.js'
			},
			main: {
				src: [
						"main/main.js",
					"main/filtering.js",
						 ],
				dest: 'main.build.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= grunt.template.today("mm-dd-yyyy") %> */\n'
			},
			browser: {
				src: 'dist/build.js',
				dest: 'dist/build.min.js'
			},
			webview: {
				src: 'dist/webview.js',
				dest: 'dist/webview.min.js'
			},
		},
		electron: {
			osxBuild: {
				options: {
					name: 'Min',
					dir: __dirname,
					out: 'dist/app',
					version: electronVersion,
					'app-version': version,
					platform: 'darwin',
					arch: 'x64',
					icon: "icon.icns",
					ignore: 'dist/app',
					prune: true,
					overwrite: true,
					protocols: [{
						name: "HTTP link",
						schemes: ["http", "https"]
					}, {
						name: "File",
						schemes: ["file"]
					}],
				}
			},
			linuxBuild: {
				options: {
					name: 'annam',
					dir: __dirname,
					out: 'dist/app',
					version: electronVersion,
					'app-version': version,
					platform: 'linux',
					arch: 'all',
					ignore: 'dist/app',
					prune: true,
					overwrite: true,
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-electron');
	grunt.loadNpmTasks('grunt-electron-installer-debian');

	grunt.registerTask('default', ['concat:browser', 'uglify:browser', 'concat:webview', 'uglify:webview', 'concat:main']);
	grunt.registerTask('browser', ['concat:browser', 'uglify:browser']);
	grunt.registerTask('webview', ['concat:webview', 'uglify:webview']);

	grunt.registerTask('macBuild', ['concat:browser', 'uglify:browser', 'concat:webview', 'uglify:webview', 'concat:main', 'electron:osxBuild'])
	grunt.registerTask('linuxBuild', ['concat:browser', 'uglify:browser', 'concat:webview', 'uglify:webview', 'concat:main', 'electron:linuxBuild', 'electron-installer-debian:linux32', 'electron-installer-debian:linux64'])
	grunt.registerTask('windowsBuild', ['concat:browser', 'uglify:browser', 'concat:webview', 'uglify:webview', 'concat:main',  'electron:windowsBuild'])
};
