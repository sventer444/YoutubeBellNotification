const { parallel, src, dest, series, watch } = require("gulp");
const del = require("del");
const zip = require("gulp-zip");
const rename = require("gulp-rename");
const mergeStream = require("merge-stream");
const jsonModify = require("gulp-json-modify");

const version = require("./package.json").version;
const baseOutputFolder = "build";
const outputFolderFirefox = baseOutputFolder + "/firefox";
const outputFolderChrome = baseOutputFolder + "/chrome";

function cleanFirefox() {
    return del(outputFolderFirefox, {force: true});
}

function buildFirefox() {
    const singleFiles = src("manifest_firefox.json")
        .pipe(rename("manifest.json"))
        .pipe(jsonModify({
            key: "version",
            value: version
        }))
        .pipe(src(["content-script.js", "player.js", "audio/Taco-Bell-Bong-SFX.mp3"]));

    const directorys = src("./");

    return mergeStream(singleFiles, directorys)
        .pipe(dest(outputFolderFirefox))
        .pipe(zip("youtube-bell-notif_firefox_" + version + ".zip"))
        .pipe(dest(baseOutputFolder));
}

function cleanChrome() {
    return del(outputFolderChrome, {force: true});
}

function buildChrome() {
    const singleFiles = src("manifest_chrome.json")
        .pipe(rename("manifest.json"))
        .pipe(jsonModify({
            key: "version",
            value: version
        }))
        .pipe(src(["content-script.js", "player.js", "audio/Taco-Bell-Bong-SFX.mp3"]));

    const directorys = src("./");

    return mergeStream(singleFiles, directorys)
        .pipe(dest(outputFolderChrome))
        .pipe(zip("youtube-bell-notif_chrome_" + version + ".zip"))
        .pipe(dest(baseOutputFolder));
}

function watchAllCodeFiles() {
    return watch([
        "manifest_chrome.json",
        "manifest_firefox.json",
        "content-script.js",
        "player.js"
    ], parallel(firefox, chrome));
}

const firefox = series(cleanFirefox, buildFirefox);
exports.firefox = firefox;

const chrome = series(cleanChrome, buildChrome);
exports.chrome = chrome;

exports.watch = watchAllCodeFiles;

exports.default = parallel(
    chrome,
    firefox
);
