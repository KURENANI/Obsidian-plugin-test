import {Plugin } from 'obsidian'
export default class ExemplePlugin extends Plugin {
	StatusBarTextElement: HTMLSpanElement;

	onload() //when the vault is finished loading run the code inside
	{
		this.StatusBarTextElement = this.addStatusBarItem().createEl('span')
		this.ReadActiveFileAndUpdateLineCount();

		this.app.workspace.on('active-leaf-change', async () => { //when everything has loaded
			this.ReadActiveFileAndUpdateLineCount();
		});
		this.app.workspace.on('editor-change', (editor) => { //When something is changed in the editor, run the code below
			const content = editor.getDoc().getValue();
			this.updateLineCount(content);

		});
		
	}
	private updateLineCount(fileContent?: string /*? turns variable to a Optional variable */) {
		const count = fileContent ? fileContent.split(/\r\n|\r|\n/).length : 0;
		const linecount = count === 1 ? "Line" : "Lines";
		this.StatusBarTextElement.textContent = `${count} ${linecount}`;
	}
	private async ReadActiveFileAndUpdateLineCount() {
		const file = this.app.workspace.getActiveFile() //get actictive file
		if (file) { //if file is not empty
			const content = await this.app.vault.read(file) //read the file and get the content inside
			this.updateLineCount(content) // send it to the console ps. the name of the file is exluded
		} else {
			this.updateLineCount(undefined)
		}
	}
}
