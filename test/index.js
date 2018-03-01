const chai = require('chai'),
	should = chai.should(),
	fileTree = require('../index');

describe('The fileTree module should', () => {

	it('print out root files in the "sample" folder', () => {
		fileTree('./test/sample').should.eql([
			{
				name: 'sample',
				path: './test/sample',
				fullPath: 'test/sample/sample',
				isDir: true
			},
			{
				name: 'sample-2',
				path: './test/sample',
				fullPath: 'test/sample/sample-2',
				isDir: true
			},
			{
				name: 'tester.md',
				path: './test/sample',
				fullPath: 'test/sample/tester.md',
				isDir: false,
				ext: 'md'
			}
		]);
	});

	it('print out the files in the "sample" folder recursively', () => {
		fileTree('./test/sample', true).should.eql([
		  {
		    "name": "sample",
		    "path": "./test/sample",
		    "fullPath": "test/sample/sample",
		    "isDir": true,
		    "files":[
		      {
		        "name": "hello.html",
		        "path": "test/sample/sample",
		        "fullPath": "test/sample/sample/hello.html",
		        "isDir": false,
		        "ext": "html"
		      },
		      {
		        "name": "noice.txt",
		        "path": "test/sample/sample",
		        "fullPath": "test/sample/sample/noice.txt",
		        "isDir": false,
		        "ext": "txt"
		      }
		    ]
		  },
		  {
		    "name": "sample-2",
		    "path": "./test/sample",
		    "fullPath": "test/sample/sample-2",
		    "isDir": true,
		    "files":[
		      {
		        "name": "sample-3",
		        "path": "test/sample/sample-2",
		        "fullPath": "test/sample/sample-2/sample-3",
		        "isDir": true,
		        "files":[
		          {
		            "name": "say-what.txt",
		            "path": "test/sample/sample-2/sample-3",
		            "fullPath": "test/sample/sample-2/sample-3/say-what.txt",
		            "isDir": false,
		            "ext": "txt"
		          }
		        ]
		      },
		      {
		        "name": "super.html",
		        "path": "test/sample/sample-2",
		        "fullPath": "test/sample/sample-2/super.html",
		        "isDir": false,
		        "ext": "html"
		      }
		    ]
		  },
		  {
		    "name": "tester.md",
		    "path": "./test/sample",
		    "fullPath": "test/sample/tester.md",
		    "isDir": false,
		    "ext": "md"
		  }
		]);
	});

	it('return an error when a path is not provided', () => {
		(function () {
			new fileTree();
		}).should.throw(Error);
	});

	it('return an error when the path provided is not a string', () => {
		(function () {
			new fileTree(1);
		}).should.throw(Error);
	});

	it('return an error when the recursive argument is not a boolean value', () => {
		(function () {
			new fileTree('./test/sample', 'true');
		}).should.throw(Error);
	});

});
