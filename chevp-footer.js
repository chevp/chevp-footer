/**
 * ChevpFooter - Custom Web Component
 * A reusable footer component with Chevp branding
 *
 * Usage:
 *   <chevp-footer></chevp-footer>
 *
 * Attributes:
 *   - avatar: URL to avatar image
 *   - username: GitHub username (default: "chevp")
 */
class ChevpFooter extends HTMLElement {
  constructor() {
    super()

    // Create shadow DOM for encapsulation
    this.attachShadow({ mode: 'open' })

    // Default values
    this.avatar = this.getAttribute('avatar') || 'https://avatars.githubusercontent.com/u/78725490?s=48&v=4'
    this.username = this.getAttribute('username') || 'chevp'
  }

  connectedCallback() {
    this.render()
    this.setupEventListeners()
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          bottom: 16px;
          left: 16px;
          z-index: 1000;
        }

        .footer-container {
          padding: 12px 16px;
          background: rgba(26, 26, 26, 0.9);
          border-radius: 8px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.87);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .footer-content {
          display: flex;
          align-items: center;
          gap: 4px;
          pointer-events: auto;
        }

        .avatar {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          object-fit: cover;
        }

        .avatar-error {
          display: none;
        }

        .github-icon {
          width: 16px;
          height: 16px;
          fill: white;
          margin-left: 4px;
        }

        .made-by-text {
          margin-left: 4px;
        }

        .username-link {
          color: #58a6ff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .username-link:hover {
          color: #75b5ff;
        }

        /* Light mode support */
        @media (prefers-color-scheme: light) {
          .footer-container {
            background: rgba(255, 255, 255, 0.9);
            color: #213547;
            border-color: rgba(0, 0, 0, 0.1);
          }

          .footer-container:hover {
            background: rgba(255, 255, 255, 0.95);
            border-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .github-icon {
            fill: #213547;
          }
        }
      </style>

      <div class="footer-container">
        <div class="footer-content">
          <img
            src="${this.avatar}"
            alt="${this.username}"
            class="avatar"
            onerror="this.classList.add('avatar-error')"
          />
          <span class="made-by-text">Made by</span>
          <a
            href="https://github.com/${this.username}"
            target="_blank"
            rel="noopener noreferrer"
            class="username-link"
          >
            ${this.username}
          </a>
        </div>
      </div>
    `
  }

  setupEventListeners() {
    // Add event listener for image error
    const img = this.shadowRoot.querySelector('.avatar')
    img.addEventListener('error', () => {
      img.classList.add('avatar-error')
    })
  }

  // Observed attributes for reactivity
  static get observedAttributes() {
    return ['avatar', 'username']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return

    switch (name) {
      case 'avatar':
        this.avatar = newValue
        this.render()
        break
      case 'username':
        this.username = newValue
        this.render()
        break
    }
  }
}

// Register the custom element
customElements.define('chevp-footer', ChevpFooter)

export default ChevpFooter
