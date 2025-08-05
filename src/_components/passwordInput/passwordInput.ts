import html from "./passwordInput.html"
import css from "./passwordInput.css"

class passwordInputComponent extends HTMLElement {
	static get observedAttributes() {
		return ["title", "placeholder", "srcon", "srcoff", "srcstate"];
	};

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		const template = document.createElement("template");
		template.innerHTML = `<style>${css}</style>${html}`;
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		
		this.elems = {
			input: this.shadowRoot.getElementById("input"),
			button: this.shadowRoot.getElementById("button"),
			icon: this.shadowRoot.getElementById("icon"),
			inputLabel: this.shadowRoot.getElementById("inputLabel"),
			buttonLabel: this.shadowRoot.getElementById("buttonLabel")
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
						element: this.elems.button,
						attrib: null,
						disabled: false,
						format: (value) => {
							return `Show/Hide ${value}`;
						},
						extra: null
					},
					{
						element: this.elems.inputLabel,
						attrib: "innerHTML",
						disabled: false,
						format: null,
						extra: null
					},
					{
						element: this.elems.buttonLabel,
						attrib: "innerHTML",
						disabled: false,
						format: (value) => {
							return `Show/Hide ${value}`;
						},
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
			srcon: {
				value: null,
				usages: [
					{
						element: this.elems.icon,
						attrib: null,
						format: null,
						disabled: true,
						extra: function (attrib, value, attribs) {
							if (attribs.srcstate.value == "on") {
								this.element.src = value;
							};
						}
					},
				]
			},
			srcoff: {
				value: null,
				usages: [
					{
						element: this.elems.icon,
						attrib: null,
						format: null,
						disabled: true,
						extra: function (attrib, value, attribs) {
							if (attribs.srcstate.value == "off") {
								this.element.src = value;
							};
						}
					}
				]
			},
			srcstate: {
				value: "off",
				usages: [
					{
						element: this.elems.icon,
						attrib: null,
						format: null,
						disabled: true,
						extra: function (attrib, value, attribs) {
							let src = (value == "on") ? attribs.srcon.value
								: attribs.srcoff.value;
							if (src != null) {
								this.element.src = src;
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
			],
			click: [
				{
					element: this.elems.button,
					handler: (e) => {
						this.attribs.srcstate.value = (this.attribs.srcstate.value == "on") ? "off" : "on";
						let src = (this.attribs.srcstate.value == "on") ?
							this.attribs.srcon.value : this.attribs.srcoff.value;
						if (src != null) {
							this.elems.icon.src = src;
						};
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
};

customElements.define('password-input-component', passwordInputComponent);
