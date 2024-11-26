export default {
    inherit: 'ww-layout',
    options: {
        autoByContent: true,
        displayAllowedValues: ['flex', 'inline-flex', 'grid'],
        linkable: true,
    },
    editor: {
        label: {
            en: 'Accordion',
            fr: 'Accordéon',
        },
        icon: 'cursor-click',
       
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
            bindable: true,
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
            bindable: true,
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
            bindable: true,
        },
        contentLayout: {
            label: {
                en: 'Items',
                fr: 'Items',
            },
            type: 'Repeat',
            options: {
                text: { en: 'Elements to repeat' },
            },
            hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.isFixed),
            bindable: 'repeatable',
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: {
                validations: [
                    {
                        type: 'array',
                    },
                    {
                        type: 'object',
                    },
                ],
                tooltip:
                    'A collection or an array of data: \n\n`myCollection` or `[{}, {}, ...] || ["string1", "string2", ...] || [1, 2, ...]`',
            },
        },
    },
};
