const url_generic_ill = "https://illiad.bu.edu/illiad/bos/illiad.dll";

const md_list_item = (title, href, desc) => `
  <md-list-item class="md-3-line _md-button-wrap _md md-clickable" role="listitem" tabindex="-1" style="">
    <div class="md-button _md-no-style" onclick="window.open('${href}', '_blank')">
      <button class="_md-no-style md-button md-primoExplore-theme md-ink-ripple" type="button">
        <div class="md-ripple-container" style=""></div>
      </button>
      <div class="_md-list-item-inner">
        <div class="md-list-item-text">
          <h3>${title}</h3>
          <h4 class="loans-brief-display"><span translate="nui.loan.brief.1"></span> ${desc}</h4>
        </div>
        <div class="tile-item-arrow">
          <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right">
            <md-icon md-svg-icon="primo-ui:chevron-right" alt="" class="md-primoExplore-theme" aria-label="primo-ui:chevron-right" role="img">
              <svg id="chevron-right_cache51" width="100%" height="100%" viewBox="0 0 24 24" y="384" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
              </svg>
            </md-icon>
          </prm-icon>
        </div>
      </div>
    </div>
  </md-list-item>`;

export const ill_requests_template = `
  <div class="tiles-grid-tile">
    <div class="tile-content layout-column" layout="column">
      <div class="tile-header layout-column" layout="column">
        <div layout="row" layout-align="space-between" class="layout-align-space-between-stretch layout-row">
          <h2 class="header-link light-text" tabindex="0" role="button" onclick="window.open('${url_generic_ill}')">
            <span>Interlibrary Loans (ILL)</span>
          </h2>
        </div>
      </div>
      <div>
        <md-list layout="column" role="list" class="md-primoExplore-theme layout-column">
          ${md_list_item("Central ILL account", url_generic_ill, "View your ILL items and requests")}
          ${md_list_item("Law Library ILL", "https://www.bu.edu/lawlibrary/using-the-library/other-libraries/", "Info for Law affiliates")}
          ${md_list_item("Medical Library ILL", "https://www.bumc.bu.edu/medlib/services/order-articlesbooks/", "Info for Med campus affiliates")}
          ${md_list_item("Theology Library ILL", url_generic_ill, "Info for STH affiliates")}
        </md-list>
      </div>
    </div>
  </div>`;