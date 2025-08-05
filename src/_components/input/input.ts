import html from "./input.html"
import css from "./input.css"

class inputComponent extends HTMLElement {
	static get observedAttributes() {
		return ["title", "placeholder", "autocomplete", "autofocus"];
	};
	
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		const template = document.createElement("template");
		template.innerHTML = `<style>${css}</style>${html}`;
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		this.elems = {
			input: this.shadowRoot.getElementById("input"),
			inputLabel: this.shadowRoot.getElementById("inputLabel")
		};

		this.attribs = {
			title: {
				value: null,
				usages: [
					{
						element: this.elems.input,
						attrib: null,
						disabled: false,
						format: null,
						extra: null
					},
					{
						element: this.elems.inputLabel,
						attrib: "innerHTML",
						disabled: false,
						format: null,
						extra: null
					}
				]
			},
			placeholder: {
				value: null,
				usages: [
					{
						element: this.elems.input,
						attrib: null,
						disabled: false,
						format: null,
						extra: null
					}
				]
			},
			autocomplete: {
				value: null,
				usages: [
					{
						element: this.elems.input,
						attrib: null,
						disabled: false,
						format: null,
						extra: null
					}
				]	
			},
			autofocus: {
				value: null,
				usages: [
					{
						element: this.elems.input,
						attrib: null,
						disabled: false,
						format: null,
						extra: function (attrib, value, attribs) {
							if (value == "true") {
								this.element.focus();
							};
						}
					}
				]
			},
		};
	
		this.handlers = {
			input: [
				{
					element: this.elems.input,
					handler: (e) => {
						console.log(e.target.value);
					}
				}
			]
		};
	};
	
	connectedCallback() {
		Object.entries(this.handlers).forEach(([event, listeners]) => {
			listeners.forEach((listener) => {
				listener.element.addEventListener(event, listener.handler);
			});
		});
    };

	attributeChangedCallback(attrib, oldValue, value) {
		if (this.attribs[attrib] == undefined) { return; };
		this.attribs[attrib].value = value;
		this.attribs[attrib].usages.forEach((usage) => {
			if (!usage.disabled) {
				usage.element[usage.attrib ?
					usage.attrib : attrib] = usage.format ?
						usage.format(value) : value;
			};
			if (usage.extra) {
				usage.extra(attrib, value, this.attribs);
			};
		});
	};

	disconnectedCallback() {
		Object.entries(this.handlers).forEach(([event, listeners]) => {
			listeners.forEach((listener) => {
				listener.element.removeEventListener(event, listener.handler);
			});
		});
	};
}

customElements.define('input-component', inputComponent);
