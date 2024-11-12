export default {
    inherit: 'ww-text',
    options: {
        autoByContent: true,
        displayAllowedValues: ['flex', 'inline-flex'],
        linkable: true,
    },
    editor: {
        label: {
            en: 'Accordion',
            fr: 'Accordéon',
        },
        icon: 'cursor-click',
        infoTags: () => {
            return [];
        },
        workflowHint: () => {
            return false;
        },
    },
    states: ['focus', 'disabled'],
    triggerEvents: [
        {
            name: 'change',
            label: {
                en: 'On value change',
                fr: 'Changement de valeur',
            },
            event: {
                value: '',
            },
        },
    ],
    actions: [
        {
            label: 'Toggle accordion',
            action: 'toggleAccordion',
        },
        {
            label: 'Open accordion',
            action: 'openAccordion',
        },
        {
            label: 'Close accordion',
            action: 'closeAccordion',
        },
    ],
    properties: {
        type: {
            label: {
                en: 'Type',
                fr: 'Type',
            },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: 'single', label: { en: 'Single', fr: 'Single' } },
                    { value: 'multiple', label: { en: 'Multiple', fr: 'Multiple' } },
                ],
            },
            defaultValue: 'single',
        },

        defaultValue: {
            label: {
                en: 'Default value',
                fr: 'Valeur par défaut',
            },
            type: 'Text',
            section: 'style',
            description: {
                en: 'The default value of the accordion',
                fr: "La valeur par défaut de l'accordéon",
            },
        },

        orientation: {
            label: {
                en: 'Orientation',
                fr: 'Orientation',
            },
            type: 'TextSelect',
            section: 'style',
            options: {
                options: [
                    { value: 'vertical', label: { en: 'Vertical', fr: 'Vertical' } },
                    { value: 'horizontal', label: { en: 'Horizontal', fr: 'Horizontal' } },
                ],
            },
            defaultValue: 'vertical',
        },

        contentLayout: {
            hidden: true,
            defaultValue: [],
        },
    },
};
