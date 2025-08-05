import html from "./button.html"
import css from "./button.css"

class buttonComponent extends HTMLElement {
	static get observedAttributes() {
		return ["title", "placeholder"];
	};
	
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		const template = document.createElement("template");
		template.innerHTML = `<style>${css}</style>${html}`;
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		this.elems = {
			button: this.shadowRoot.getElementById("button"),
			buttonLabel: this.shadowRoot.getElementById("buttonLabel")
		};

		this.attribs = {
			title: {
				value: null,
				usages: [
					{
						element: this.elems.button,
						attrib: null,
						disabled: false,
						format: null,
						extra: null
					},
					{
						element: this.elems.buttonLabel,
						attrib: "innerHTML",
						disabled: false,
						format: null,
						extra: null
					}
				]
			}
		};
		
		this.handlers = {
			click: [
				{
					element: this.elems.button,
					handler: (e) => {
						console.log("Login button clicked.")
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


customElements.define('button-component', buttonComponent);
