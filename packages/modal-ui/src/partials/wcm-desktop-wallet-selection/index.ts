import { ConfigCtrl, ModalCtrl } from '@walletconnect/modal-core'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SvgUtil } from '../../utils/SvgUtil'
import { TemplateUtil } from '../../utils/TemplateUtil'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('wcm-desktop-wallet-selection')
export class WcmDesktopWalletSelection extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- render ------------------------------------------------------- //
  protected render() {
    const { explorerExcludedWalletIds, enableExplorer } = ConfigCtrl.state
    const isExplorerWallets = explorerExcludedWalletIds !== 'ALL' && enableExplorer
    const manualTemplate = TemplateUtil.manualWalletsTemplate()
    const recomendedTemplate = TemplateUtil.recomendedWalletsTemplate()
    const recentTemplate = TemplateUtil.recentWalletTemplate()
    let templates = [recentTemplate, ...manualTemplate, ...recomendedTemplate]
    templates = templates.filter(Boolean)

    const isViewAll = templates.length > 4 || isExplorerWallets
    let wallets = []
    if (isViewAll) {
      wallets = templates.slice(0, 3)
    } else {
      wallets = templates
    }
    const isWallets = Boolean(wallets.length)

    return html`
      <wcm-modal-header
        .border=${true}
        title="Connect wallet"
        .onAction=${ModalCtrl.close}
        .actionIcon=${SvgUtil.CROSS_ICON}
      ></wcm-modal-header>

      <wcm-modal-content>
        <div class="wcm-modal-inner">
          <div class="title">WalletConnect</div>
          <div class="desc">Scan QR code with a WalletConnect-compatible wallet</div>

          <div class="wcm-qr-wrapper">
            <wcm-walletconnect-qr></wcm-walletconnect-qr>
          </div>
        </div>
      </wcm-modal-content>

      ${isWallets
        ? html`
            <wcm-modal-footer>
              <div class="wcm-desktop-title">
                ${SvgUtil.DESKTOP_ICON}
                <wcm-text variant="small-regular" color="accent">Desktop</wcm-text>
              </div>

              <div class="wcm-grid">
                ${wallets}
                ${isViewAll
                  ? html`<wcm-view-all-wallets-button></wcm-view-all-wallets-button>`
                  : null}
              </div>
            </wcm-modal-footer>
          `
        : null}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcm-desktop-wallet-selection': WcmDesktopWalletSelection
  }
}
