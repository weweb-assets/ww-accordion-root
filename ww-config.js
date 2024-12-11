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
            description: 'Toggle the accordion',
            icon: 'chevron-bottom',
            args: [
                {
                    name: 'Value',
                    type: 'any',
                    required: true,
                },
            ],
        },
        {
            label: 'Open accordion',
            action: 'openAccordion',
            description: 'Open the accordion',
            icon: 'chevron-bottom',
            args: [
                {
                    name: 'Value',
                    type: 'any',
                    required: true,
                },
            ],
        },
        {
            label: 'Close accordion',
            action: 'closeAccordion',
            description: 'Close the accordion',
            icon: 'chevron-bottom',
            args: [
                {
                    name: 'Value',
                    type: 'any',
                    required: true,
                },
            ],
        },
        {
            label: 'Set accordion value',
            action: 'setAccordionValue',
            description: 'Set the value of the accordion',
            icon: 'chevron-bottom',
            args: [
                {
                    name: 'Value',
                    type: 'any',
                    required: true,
                },
            ],
        },
    ],
    properties: {
        contentLayout: {
            label: {
                en: 'Items',
                fr: 'Items',
            },
            type: 'Info',
            options: {
                text: { en: 'Elements to repeat' },
            },
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
    },
};
