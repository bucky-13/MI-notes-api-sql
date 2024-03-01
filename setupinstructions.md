## Things needed to make this site run:

### npm modules:

Run "npm i" in the root folder, the node_modules should end up in the root folder as well.

### start backend server

Run "nodemon start" in the root folder of the project

### .env file

Place in the same spot as example.env (root folder), key & value pairs instruction should be written on it's learning where I turned in the assignment.  
There's also instructions in the example.env except for the KEY_OF_SALT since I think that one needs to be the same in order for password management to work.

### server and server data

An export of the database should be available on It's Learning in attachments where I replied to this task. You know better than me how to import it :wink:

### Run frontend client

Open with Live server in VsCode, index.html is inside the frontend folder.

### tinyMCE script(if it doesn't work)

If the tinyMCE text editor on the frontend application doesn't work, check the path in the script tag on row 9 in index.html with src="/node_modules/tinymce/tinymce.min.js"  
It should be correctly installed but if it's not, locate the folder that tinymce.min.js is located in inside node_modules and update the src path in index.html.