import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons';
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import marked from 'marked';

const defaultMarkDown = `# Welcome to my React Markdown Previewer!


## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
return multiLineCode;
}
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
- Some are bulleted.
- With different indentation levels.
- That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:
`;

class MarkDown extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
        this.state = ({
            editorText: defaultMarkDown,
            preview: "min",
            editor: "min"
        });

    };

    handleChange(event) {
        this.setState({
            editorText: event.target.value
        });
        console.log(event.target.value);
        const previewerTextEl = document.querySelector("#preview");
        previewerTextEl.innerHTML = marked(event.target.value);
    };


    componentDidMount() {
        const previewerTextEl = document.querySelector("#preview");
        previewerTextEl.innerHTML = marked(defaultMarkDown)
    };

    togglePreview() {
        const previewMaxIcon = document.querySelector("#preview-window-max");
        const previewMinIcon = document.querySelector("#preview-window-min");
        const editorBox = document.querySelector("#editor-box");
        const previewBox = document.querySelector("#preview-box");
        const previewBar = document.querySelector("#preview-bar");
        const editorBar = document.querySelector("#editor-bar");
        
        if (this.state.preview == "min") {
        previewMaxIcon.parentElement.className = "hidden col-1 text-right";
        previewMinIcon.parentElement.className = "visible col-1 text-right";
            previewBox.className = "col-12 text-left";
            editorBox.className = "hidden col-6 text-left";
            previewBar.className = "col-12";
            editorBar.className = "hidden col-6"
            this.setState({
            preview: "max"
        });
        } else if (this.state.preview == "max") {
            previewMaxIcon.parentElement.className = "visible col-1 text-right";
            previewMinIcon.parentElement.className = "hidden col-1 text-right";
            previewBox.className = "col-6 text-left";
            editorBox.className = "col-6 text-left";
            previewBar.className = "col-6";
            editorBar.className = "col-6";
             this.setState({
            preview: "min"
        });
        };
        
        //if state.preview == min then max window by changes class col sizes and toggle the max button to hidden and unhide min button THEN setstate preview to MAX

    };

    toggleEditor() {
        const editorMaxIcon = document.querySelector("#editor-window-max");
        const editorMinIcon = document.querySelector("#editor-window-min");
        const editorBox = document.querySelector("#editor-box");
        const previewBox = document.querySelector("#preview-box");
        const previewBar = document.querySelector("#preview-bar");
        const editorBar = document.querySelector("#editor-bar");
        
                if (this.state.editor == "min") {
        editorMaxIcon.parentElement.className = "hidden col-1 text-right";
        editorMinIcon.parentElement.className = "visible col-1 text-right";
            editorBox.className = "col-12 text-left";
            previewBox.className = "hidden col-6 text-left";
            editorBar.className = "col-12";
            previewBar.className = "hidden col-6";
            this.setState({
            editor: "max"
        });
        } else if (this.state.editor == "max") {
            editorMaxIcon.parentElement.className = "visible col-1 text-right";
            editorMinIcon.parentElement.className = "hidden col-1 text-right";
            previewBox.className = "col-6 text-left";
            editorBox.className = "col-6 text-left";
            previewBar.className = "col-6";
            editorBar.className = "col-6";
           
           this.setState({
            editor: "min"
        });
        };

    }


    render() {
        return (
            <div className = "container">
            <div className= "row">
            <div id = "preview-bar" className = "col-6">
            <div className = "row no-gutters">
            <div className = "col-11 text-left">
            <h3 id = "preview-title">Preview</h3>
            </div>
            <div className = "col-1 text-right"><FontAwesomeIcon id = "preview-window-max" onClick = {this.togglePreview} icon={faWindowMaximize}/>
            </div>
            <div className = "hidden col-1 text-right"><FontAwesomeIcon id = "preview-window-min" onClick = {this.togglePreview} icon={faWindowRestore}/>
            </div>
            </div>
            </div>
            <div id = "editor-bar" className = "col-6">
            <div className = "row no-gutters">
            <div className = "col-11 text-left">
            <h3 id = "editor-title">Editor</h3>
            </div>
            <div className = "col-1 text-right"><FontAwesomeIcon id = "editor-window-max" icon={faWindowMaximize} onClick = {this.toggleEditor}/>
            </div>
            <div id = "test-div" className = "hidden col-1 text-right"><FontAwesomeIcon id = "editor-window-min" icon={faWindowRestore} onClick = {this.toggleEditor}/>
            </div>
            </div>
            </div>
            </div>
            <div className = "row">
            <div id = "preview-box" className = "col-6 text-left"> 
            <div id = "preview">
            </div>
            </div>
            <div className = "col-6 text-left" id = "editor-box">
            <textarea id = "editor" className = "editor-input" type = "text" onChange = {this.handleChange}>
            {defaultMarkDown}
            </textarea>
            </div>
            </div>
            </div>
        );
    };
};

export default MarkDown;
