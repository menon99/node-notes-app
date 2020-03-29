# **Note App**

## A simple command line *node.js* notes app

### To run, either clone or download the repository and cd into it

``` 
$ npm install
```

### To add a  new note

```
$ node app.js add --title="note1" --text="hello world"
```

#### **Note** This overwrites an exisiting note with the same title if present

### To Read a note

``` 
$ node app.js read --title="note1"
```

### To List all notes

```
 $ node app.js list
```

### To Remove a note

```
$ node app.js remove --title="note1"
```

## Dependencies

- yargs : For command line argument parsing
- chalk : For adding color to command line output
- loadash.isEmpty : To check for empty object
