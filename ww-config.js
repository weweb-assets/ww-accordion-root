export default {
    inherit: 'ww-accordion-root',
    options: {
        autoByContent: true,
        displayAllowedValues: ['flex', 'inline-flex'],
        linkable: true,
    },
    editor: {},
    states: ['focus', 'disabled'],
    triggerEvents: [],
    actions: [
        {
            label: 'Toggle dialog',
            action: 'toggleDialog',
        },
        {
            label: 'Open dialog',
            action: 'openDialog',
        },
        {
            label: 'Close dialog',
            action: 'closeDialog',
        },
    ],
    properties: {},
};
