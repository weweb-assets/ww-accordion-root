<template>
    <wwLayout path="contentLayout" />
</template>

<script>
import { computed, provide, ref, watch } from 'vue';

export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['trigger-event'],
    setup(props, { emit }) {
        const orientation = ref(() => props.content.orientation);
        const defaultValue = ref(() => props.content.defaultValue);
        const type = computed(() => props.content.type);

        const { value: componentValue, setValue: setComponentValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: 'any',
            defaultValue: props.content.defaultValue || null,
            componentType: 'element',
        });

        const value = computed({
            get: () => componentValue.value,
            set: value => {
                setComponentValue(value);
                emit('trigger-event', { name: 'change', event: { value } });
            },
        });

        watch(
            () => props.content.type,
            newType => {
                console.log('newType', newType);
                setComponentValue(newType === 'single' ? '' : []);
            }
        );

        provide('weweb-assets/ww-accordion-root', { value });

        function toggleAccordion(toggleValue) {
            if (type.value === 'multiple') {
                const currentValues = new Set(value.value);
                currentValues.has(toggleValue) ? currentValues.delete(toggleValue) : currentValues.add(toggleValue);
                value.value = Array.from(currentValues);
            } else {
                value.value = value.value === toggleValue ? null : toggleValue;
            }
        }

        function openAccordion(openValue) {
            if (type.value === 'multiple') {
                const currentValues = new Set(value.value);
                currentValues.add(openValue);
                value.value = Array.from(currentValues);
            } else {
                value.value = openValue;
            }
        }

        function closeAccordion(closeValue) {
            if (type.value === 'multiple') {
                value.value = value.value.filter(val => val !== closeValue);
            } else {
                value.value = value.value === closeValue ? null : value.value;
            }
        }

        function setAccordionValue(setAccordionValue) {
            value.value = setAccordionValue;
        }

        wwLib.wwElement.useRegisterElementLocalContext('ww-accordion-root', ref({ value }), {
            toggleAccordion: {
                method: toggleAccordion,
                editor: {
                    label: 'Toggle accordion',
                    group: 'Accordion',
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
            },
            openAccordion: {
                method: openAccordion,
                editor: {
                    label: 'Open accordion',
                    group: 'Accordion',
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
            },
            closeAccordion: {
                method: closeAccordion,
                editor: {
                    label: 'Close accordion',
                    group: 'Accordion',
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
            },
            setAccordionValue: {
                method: setAccordionValue,
                editor: {
                    label: 'Set accordion value',
                    group: 'Accordion',
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
            },
        });

        return {
            type,
            defaultValue,
            orientation,
        };
    },
};
</script>
