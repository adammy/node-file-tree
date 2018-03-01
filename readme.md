# Node File Tree
### A node module for getting a tree-based structure of files.

#### Installation
```sh
npm install node-file-tree --save
```

#### Usage
Reference the fileTree function like so:
```javascript
const myFiles = fileTree('./myFolder');
```
fileTree returns an array of objects that will look like the following:
```javascript
[
	{
		name: 'images',
		path: './myFolder',
		fullPath: 'myFolder/images',
		isDir: true
	},
	{
		name: 'home.html',
		path: './myFolder',
		fullPath: 'myFolder/home.html',
		isDir: false,
		ext: 'html'
	},
	{
		name: 'wowzers.js',
		path: './myFolder',
		fullPath: 'myFolder/wowzers.js',
		isDir: false,
		ext: 'js'
	}
]
```

#### Arguments
When calling the fileTree function, you can pass it two arguments to alter its behavior. The first argument is the path you want the module to traverse. The second argument determines whether the script to be recursive or not (basically do you want the root files or the root files and all of its subfolders/files).

Details of each setting are below:

**path** (string) (required)<br />
Default value: none<br />
This is the path you want the module to traverse and get files from.

**recursive** (boolean) (optional)<br />
Default value: false<br />
If true, in addition to the root files, the module will also get all subfolders and files. The module will place these objects in a newly-added property called files (see example below).
```javascript
[
	{
		name: 'images',
		path: './myFolder',
		fullPath: 'myFolder/images',
		isDir: true,
		files: [
			{
				name: 'icons',
				path: './myFolder/images',
				fullPath: 'myFolder/images/icons'
				isDir: true,
				files: [
					{
						name: 'sprite-sheet.png',
						path: './myFolder/images/icons',
						fullPath: 'myFolder/images/icons/sprite-sheet.png',
						isDir: false,
						ext: 'png'
					}
				]
			},
			{
				name: 'banner.png',
				path: './myFolder/images',
				fullPath: 'myFolder/images/banner.png',
				isDir: false,
				ext: 'png'
			},
			{
				name: 'landscape.jpg',
				path: './myFolder/images',
				fullPath: 'myFolder/images/landscape.jpg',
				isDir: false,
				ext: 'jpg'
			}
		]
	}
]
```
