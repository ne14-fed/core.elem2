import inlineCss from './new-demo.scss';
import inlineHtml from './new-demo.html';

/**
 * Lol at the new kinda demo :D :D :D
 */
export class NewDemo extends HTMLElement {
  private _message: string = "Default Message";

  static get observedAttributes() {
    return ["message"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(inlineCss);
    this.shadowRoot!.adoptedStyleSheets = [sheet];
    this.shadowRoot!.innerHTML = inlineHtml;
  }

  /**
   * Gets or sets the message.
   */
  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
    this.setAttribute("message", value);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "message") {
      console.log('woot! message changed:', oldValue, '-->', newValue);
    }
  }
}

if (!customElements.get("new-demo")) {
  customElements.define("new-demo", NewDemo);
}
