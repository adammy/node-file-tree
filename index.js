const fs = require('fs'),
	path = require('path'),
	filesToIgnore = ['.DS_Store', 'Thumbs.db'],
	util = require('util');

const getFiles = (folderPath, recursive = false, query = null) => {

	// all of the error checking
	if (!folderPath) {
		return new Error('getFiles() was called without a folderPath argument');
	}
	if (typeof folderPath != 'string') {
		return new Error('getFiles() was called with an invalid folderPath argument; it must be of type String');
	}
	if (typeof recursive != 'boolean') {
		return new Error('getFiles() was called with an invalid recursive argument; it must be of type Boolean')
	}

	const files = fs.readdirSync(folderPath)

		// filter out filesToIgnore
		.filter(file => !filesToIgnore.includes(file))

		// change each file to a full object
		.map(file => {

			const fileObj = {};
			fileObj.name = file;
			fileObj.path = folderPath;
			fileObj.fullPath = path.join(folderPath, file);
			fileObj.isDir = fs.statSync(fileObj.fullPath).isDirectory();

			// if obj is not a folder; add an extension property
			if (!fileObj.isDir) {
				const ext = path.extname(fileObj.name);
				fileObj.ext = ext.substring(1, ext.length);
			}

			// if recursive = true, then create files property that recursively calls this function
			if (recursive && fileObj.isDir) {
				fileObj.files = getFiles(fileObj.fullPath, true);
			}

			return fileObj;

		})

		// sort files; give precedence to folders
		.sort((a, b) => {
			if (a.isDir && b.isDir) return (a.name < b.name) ? -1 : 1;
			else if (a.isDir) return -1;
			else if (b.isDir) return 1;
			else return (a.name < b.name) ? -1 : 1;
		});

	return files;

};

console.log( util.inspect(getFiles('./emails/build', true), false, null) );

// module.exports = getFiles;
