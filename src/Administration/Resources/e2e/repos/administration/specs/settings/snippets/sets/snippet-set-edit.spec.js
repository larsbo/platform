const settingsPage = require('administration/page-objects/module/sw-settings.page-object.js');

module.exports = {
    '@tags': ['settings', 'snippet-set-edit', 'snippets', 'snippet-set', 'edit'],
    '@disabled': !global.flags.isActive('next717'),
    before: (browser, done) => {
        global.AdminFixtureService.create('snippet-set').then(() => {
            done();
        });
    },
    'open snippet module': (browser) => {
        browser
            .openMainMenuEntry({
                targetPath: '#/sw/settings/snippet/index',
                mainMenuId: 'sw-settings',
                subMenuId: 'sw-settings-snippet'
            });
    },
    'verify snippet set to be edited': (browser) => {
        const page = settingsPage(browser);

        browser.expect.element(`${page.elements.gridRow}--0 a`).to.have.text.that.equals('A Set Name Snippet');
    },
    'delete snippet': (browser) => {
        const page = settingsPage(browser);

        browser
            .clickContextMenuItem('.sw-context-menu-item--danger', page.elements.contextMenuButton)
            .expect.element(`${page.elements.modal} ${page.elements.modal}__body`).to.have.text.that.contains(`Are you sure you want to delete the snippet set "${global.AdminFixtureService.basicFixture.name}"?`);

        browser
            .click(`${page.elements.modal}__footer button${page.elements.primaryButton}`)
            .checkNotification('Snippet set has been deleted successfully.')
            .waitForElementNotPresent(page.elements.loader);
    },
    'verify deletion': (browser) => {
        const page = settingsPage(browser);

        browser.expect.element(`${page.elements.gridRow}--0 a`).to.have.text.that.not.equals('A Set Name Snippet');
    },
    after: (browser) => {
        browser.end();
    }
};
